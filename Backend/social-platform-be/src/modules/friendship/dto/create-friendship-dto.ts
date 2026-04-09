import { IsUUID } from "class-validator";

export class CreateFriendshipDTO {
    @IsUUID()
    addresseeId: string
}