import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "src/database/entities/notification.entity";
import { UserModule } from "../user/user.module";
import { NotificationService } from "./notification.service";
import { RealtimeGateway } from "src/gateway/realtime.gateway";

@Module({
    imports: [
        TypeOrmModule.forFeature([Notification]),
        UserModule
    ],
    providers: [NotificationService, RealtimeGateway],
    exports: [NotificationService]
})
export class NotificationModule {};