import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "src/database/entities/message.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { SendMessageDTO } from "./dto/send_message.dto";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly repo: Repository<Message>,
        private readonly userSerive: UserService
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
        return this.repo.save(message);
    }

    async getConversation(userA: string, userB: string) {
        return this.repo.createQueryBuilder("m")
            .where("(m.senderId = :userA AND m.receiverId = :userB) OR (m.senderId = :userB AND m.receiverId = :userA)",
                { userA, userB })
            .orderBy("m.createdAt", "ASC")
            .getMany();
    }
}