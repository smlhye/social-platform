import { IsEnum, IsOptional, IsString } from "class-validator";
import { NotificationType } from "src/database/entities/notification.entity";

export class CreateNotificationDTO {
    @IsOptional()
    @IsString()
    senderId?: string;

    @IsOptional()
    @IsString()
    senderName?: string;

    @IsEnum(NotificationType)
    type: NotificationType;

    @IsOptional()
    @IsString()
    content?: string;
}