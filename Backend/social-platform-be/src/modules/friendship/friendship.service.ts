import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Friendship, FriendshipStatus } from "src/database/entities/friendship.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { CreateFriendshipDTO } from "./dto/create-friendship-dto";
import { User } from "src/database/entities/user.entity";
import { RealtimeGateway } from "src/gateway/realtime.gateway";
import { NotificationType } from "src/database/entities/notification.entity";
import { CreateNotificationDTO } from "./dto/create-notification.dto";

@Injectable()
export class FriendshipService {
    constructor(
        @InjectRepository(Friendship)
        private readonly repo: Repository<Friendship>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly userService: UserService,
        private readonly realtimeGateway: RealtimeGateway
    ) { }

    async getFriends(userId: string) {
        const user = await this.userService.findActiveUserById(userId);
        if (!user) throw new NotFoundException("User not found!");

        const friendship = await this.repo.find({
            where: [
                { requester: { id: userId }, status: FriendshipStatus.ACCEPTED },
                { addressee: { id: userId }, status: FriendshipStatus.ACCEPTED }
            ],
            relations: ['requester', 'addressee']
        })

        const friends = friendship.map((f) => {
            const friend = f.requester.id === userId ? f.addressee : f.requester;

            return {
                id: friend.id,
                username: friend.username,
                fullName: `${friend.firstName} ${friend.lastName}`,
                avatar: null,      // sau này thêm column avatar
                isOnline: this.realtimeGateway.isUserOnline(friend.id)
            };
        })
        return friends;
    }

    async getInboxRequests(userId: string) {
        const user = await this.userService.findActiveUserById(userId);
        if (!user) throw new NotFoundException("User not found!");
        const receives = await this.repo.find({
            where: {
                addressee: { id: userId },
                status: FriendshipStatus.PENDING
            },
            relations: ['requester', 'addressee']
        })
        return receives.map((item) => ({
            id: item.id,
            senderId: item.requester.id,
            senderName: item.requester.firstName + " " + item.requester.lastName,
            avatar: item.requester.avatarURL
        }))
    }

    async getSentRequests(userId: string) {
        const user = await this.userService.findActiveUserById(userId);
        if (!user) throw new NotFoundException("User not found!");
        const requests = await this.repo.find({
            where: {
                requester: { id: userId },
                status: FriendshipStatus.PENDING
            },
            relations: ['requester', 'addressee']
        })
        return requests.map((item) => ({
            id: item.id,
            addresseeId: item.addressee.id,
            addresseeName: item.addressee.firstName + " " + item.addressee.lastName,
        }))
    }

    async sendFriendRequest(userId: string, dto: CreateFriendshipDTO) {
        const addressee = await this.userRepo.findOne({
            where: { id: dto.addresseeId, isDeleted: false }
        })
        if (!addressee) throw new NotFoundException("Addressee not found!");

        const existing = await this.repo.findOne({
            where: [
                { requester: { id: userId }, addressee: { id: dto.addresseeId } },
                { requester: { id: dto.addresseeId }, addressee: { id: userId } }
            ]
        });

        if (existing) {
            throw new BadRequestException('Friend request already exists or you are already friends');
        }

        const friendship = this.repo.create({
            requester: { id: userId },
            addressee: { id: dto.addresseeId },
            status: FriendshipStatus.PENDING
        })

        if (this.realtimeGateway.isUserOnline(dto.addresseeId)) {
            const notification: CreateNotificationDTO = {
                senderId: userId,
                senderName: "Người gửi",
                type: NotificationType.FRIEND_REQUEST,
                content: "Bạn có yêu cầu kết bạn mới!"
            };
            this.realtimeGateway.sendNotification(dto.addresseeId, notification);
        }

        return this.repo.save(friendship);

    }

    async cancelRequest(userId: string, targetId: string) {
        const request = await this.repo.findOne({
            where: {
                requester: { id: userId },
                addressee: { id: targetId },
                status: FriendshipStatus.PENDING
            },
            relations: ['requester', 'addressee']
        });

        if (!request) {
            throw new NotFoundException("Request not found!");
        }

        // 🔥 đảm bảo đúng người gửi mới được hủy
        if (request.requester.id !== userId) {
            throw new ForbiddenException("Not allowed");
        }

        await this.repo.remove(request);

        return {
            message: "Friend request cancelled successfully"
        };
    }

    async handleRequest(userId: string, requestId: string, isAccepted: boolean) {
        const friendship = await this.repo.findOne({
            where: { id: requestId, status: FriendshipStatus.PENDING },
            relations: ['requester', 'addressee']
        })

        if (!friendship)
            throw new NotFoundException("Request not found!");

        if (friendship.addressee.id !== userId)
            throw new ForbiddenException("Not allowed");

        if (isAccepted) {
            friendship.status = FriendshipStatus.ACCEPTED;
            this.repo.save(friendship);

            const requester = friendship.requester;   // 👈 A
            const accepter = friendship.addressee;    // 👈 B

            console.log("ACCEPT FRIEND:", requester.id);

            if (this.realtimeGateway.isUserOnline(requester.id)) {
                this.realtimeGateway.sendNotification(requester.id, {
                    senderId: accepter.id,
                    senderName: accepter.firstName + " " + accepter.lastName,
                    type: NotificationType.FRIEND_ACCEPTED,
                    content: `${accepter.firstName + " " + accepter.lastName} đã chấp nhận lời mời kết bạn`
                });
            }

        } else {
            this.repo.delete(requestId);
        }
    }
}