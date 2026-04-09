import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "src/database/entities/notification.entity";
import { Repository } from "typeorm";
import { SendNotificationDTO } from "./dto/send-notification.dto";
import { User } from "src/database/entities/user.entity";
import { RealtimeGateway } from "src/gateway/realtime.gateway";

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private readonly repo: Repository<Notification>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly websocketGateway: RealtimeGateway
    ) { }

    async sendNotification(dto: SendNotificationDTO) {
        const user = await this.userRepo.findOne({ where: { id: dto.receiverId } });
        if (!user) throw new NotFoundException("User not found!");

        const notification = this.repo.create({
            senderId: dto.senderId,
            senderName: dto.senderName,
            receiver: user,
            type: dto.type,
            content: dto.content
        });

        const saved = await this.repo.save(notification);
        if (this.websocketGateway.isUserOnline(dto.receiverId)) {
            this.websocketGateway.sendNotification(dto.receiverId, saved);
        }

        return saved;
    }
}