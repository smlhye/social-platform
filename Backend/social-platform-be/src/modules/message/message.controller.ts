import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { MessageService } from "./message.service";
import { SendMessageDTO } from "./dto/send_message.dto";
import { ok } from "src/common/base/response.helper";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import type { AuthRequest } from "../auth/types/auth-request.type";

@Controller("chat")
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @UseGuards(JwtAuthGuard)
    @Post("send")
    sendMessage(@Req() req: AuthRequest, @Body() dto: SendMessageDTO) {
        const senderId = req.user.userId;
        return this.messageService.sendMessage({
            senderId,
            receiverId: dto.receiverId,
            content: dto.content
        });
    }

    @Get(":userA/:userB")
    async getConservation(
        @Param("userA") userA: string,
        @Param("userB") userB: string
    ) {
        const data = await this.messageService.getConversation(userA, userB);
        return ok(data, "Success");
    }
}