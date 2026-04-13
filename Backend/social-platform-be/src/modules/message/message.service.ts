import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "src/database/entities/message.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { SendMessageDTO } from "./dto/send_message.dto";
import { MessageGateway } from "./message.gateway";
import { RealtimeGateway } from "src/gateway/realtime.gateway";
import { Friendship, FriendshipStatus } from "src/database/entities/friendship.entity";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly repo: Repository<Message>,
        @InjectRepository(Friendship)
        private readonly friendRepo: Repository<Friendship>,
        private readonly userSerive: UserService,
        private readonly realtimeGateway: RealtimeGateway
    ) { }

    async sendMessage(dto: SendMessageDTO) {
        const { senderId, receiverId, content } = dto;

        const sender = await this.userSerive.findActiveUserById(senderId);
        if (!sender) throw new NotFoundException("Sender not found!");

        const receiver = await this.userSerive.findActiveUserById(receiverId);
        if (!receiver) throw new NotFoundException("Receiver not found!");

        const message = this.repo.create({
            senderId,
            receiverId,
            content
        });
        const sendedMessage = await this.repo.save(message);
        this.realtimeGateway.sendMessage(dto.senderId, dto.receiverId, sendedMessage);
        return sendedMessage;
    }

    async getConversation(userA: string, userB: string, limit: number, offset: number) {
        return this.repo.createQueryBuilder("m")
            .where("(m.senderId = :userA AND m.receiverId = :userB) OR (m.senderId = :userB AND m.receiverId = :userA)",
                { userA, userB })
            .orderBy("m.createdAt", "DESC")
            .take(limit)
            .skip(offset)
            .getMany();
    }

    async markReaded(userId: string, senderId: string) {
        await this.repo.createQueryBuilder()
            .update(Message)
            .set({ isRead: true })
            .where("senderId = :senderId", { senderId })
            .andWhere("receiverId = :userId", { userId })
            .andWhere("isRead = false")
            .execute();

        this.realtimeGateway.sendMessagesRead(userId, senderId);
    }

    async getRecentChats(userId: string, search?: string) {

        // 1. Lấy friendIds
        const friendships = await this.friendRepo.find({
            where: [
                { requester: { id: userId }, status: FriendshipStatus.ACCEPTED },
                { addressee: { id: userId }, status: FriendshipStatus.ACCEPTED }
            ],
            relations: ["requester", "addressee"]
        });

        const friendIds = friendships.map(f =>
            f.requester.id === userId ? f.addressee.id : f.requester.id
        );

        // 2. Lấy tất cả messages liên quan
        const messages = await this.repo.createQueryBuilder("m")
            .where("m.senderId = :userId OR m.receiverId = :userId", { userId })
            .orderBy("m.createdAt", "DESC")
            .getMany();

        // 3. Lấy unreadCount 1 lần (🔥 tránh N+1)
        const unreadRaw = await this.repo.createQueryBuilder("m")
            .select("m.senderId", "senderId")
            .addSelect("COUNT(*)", "count")
            .where("m.receiverId = :userId", { userId })
            .andWhere("m.isRead = false")
            .groupBy("m.senderId")
            .getRawMany();

        const unreadMap = new Map<string, number>();
        unreadRaw.forEach(i => {
            unreadMap.set(i.senderId, parseInt(i.count));
        });

        const map = new Map<string, any>();

        // 4. Fill người đã chat
        for (const m of messages) {
            const fid = m.senderId === userId ? m.receiverId : m.senderId;
            if (map.has(fid)) continue;

            const u = await this.userSerive.findActiveUserById(fid);
            if (!u) continue;

            map.set(fid, {
                friendId: fid,
                fullName: u.firstName + " " + u.lastName,
                avatar: u.avatarURL,
                lastMessage: m.content,
                lastMessageAt: m.createdAt,
                unreadCount: unreadMap.get(fid) || 0,
                isOnline: this.realtimeGateway.isUserOnline(fid)
            });
        }

        // 5. Thêm người chưa chat
        for (const fid of friendIds) {
            if (!map.has(fid)) {
                const u = await this.userSerive.findActiveUserById(fid);
                if (!u) continue;

                map.set(fid, {
                    friendId: fid,
                    fullName: u.firstName + " " + u.lastName,
                    avatar: u.avatarURL,
                    lastMessage: "",
                    lastMessageAt: null,
                    unreadCount: unreadMap.get(fid) || 0 // ✅ FIX
                });
            }
        }

        let result = Array.from(map.values());

        if (search) {
            const keyword = search.toLowerCase();
            result = result.filter(u =>
                u.fullName.toLowerCase().includes(keyword)
            );
        }

        // 6. Sort
        return result.sort((a, b) => {
            if (!a.lastMessageAt) return 1;
            if (!b.lastMessageAt) return -1;
            return b.lastMessageAt.getTime() - a.lastMessageAt.getTime();
        });
    }

    async getUnseenChats(userId: string, search?: string) {
        // 1. Lấy friend có gửi message chưa đọc
        const raw = await this.repo
            .createQueryBuilder("m")
            .where("m.receiverId = :userId", { userId })
            .andWhere("m.isRead = false")
            .orderBy("m.createdAt", "DESC")
            .getMany();

        // 2. Gom theo senderId (mỗi người 1 chat)
        const map = new Map<string, any>();

        for (const m of raw) {
            const fid = m.senderId;

            if (map.has(fid)) continue;

            const u = await this.userSerive.findActiveUserById(fid);
            if (!u) continue;

            map.set(fid, {
                friendId: fid,
                fullName: `${u.firstName} ${u.lastName}`,
                avatar: u.avatarURL,

                lastMessage: m.content,
                lastMessageAt: m.createdAt,

                unreadCount: 1
            });
        }

        let result = Array.from(map.values());

        if (search) {
            const keyword = search.toLowerCase();
            result = result.filter(u =>
                u.fullName.toLowerCase().includes(keyword)
            );
        }

        return result.sort(
            (a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
        );
    }

    // async getRecentChats(userId: string) {
    //     // 1. Lấy tất cả tin nhắn liên quan đến userId
    //     const messages = await this.repo.createQueryBuilder("m")
    //         .where("m.senderId = :userId OR m.receiverId = :userId", { userId })
    //         .orderBy("m.createdAt", "DESC")
    //         .getMany();

    //     // 2. Duyệt và lấy tin nhắn mới nhất cho mỗi friend
    //     const recentChatsMap = new Map<string, {
    //         friendId: string;
    //         fullName: string;
    //         avatar: string;
    //         lastMessage: string;
    //         lastMessageAt: Date;
    //     }>();

    //     for (const msg of messages) {
    //         // Xác định friendId: người còn lại trong cuộc trò chuyện
    //         const friendId = msg.senderId === userId ? msg.receiverId : msg.senderId;

    //         // Nếu chưa có map, thêm vào
    //         if (!recentChatsMap.has(friendId)) {
    //             const friend = await this.userSerive.findActiveUserById(friendId);
    //             if (!friend) continue;

    //             recentChatsMap.set(friendId, {
    //                 friendId,
    //                 fullName: friend.firstName + ' ' + friend.lastName,
    //                 avatar: friend.avatarURL,
    //                 lastMessage: msg.content,
    //                 lastMessageAt: msg.createdAt
    //             });
    //         }
    //     }

    //     // 3. Chuyển map thành array và sort theo lastMessageAt giảm dần
    //     const recentChats = Array.from(recentChatsMap.values())
    //         .sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());

    //     return recentChats;
    // }
}