import { IsEnum, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { NotificationType } from "src/database/entities/notification.entity";

export class SendNotificationDTO {
    @IsUUID()
    @IsOptional()
    senderId?: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    senderName?: string;

    @IsUUID()
    receiverId: string;

    @IsEnum(NotificationType)
    type: NotificationType;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    content?: string;
}