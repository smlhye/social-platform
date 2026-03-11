import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class SendMessageDTO {
    @IsUUID()
    senderId: string;

    @IsUUID()
    receiverId: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}