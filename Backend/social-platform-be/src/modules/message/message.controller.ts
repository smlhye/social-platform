import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
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

    @UseGuards(JwtAuthGuard)
    @Patch("read/:id")
    async markedRead(@Req() req: AuthRequest, @Param("id") senderId: string) {
        const userId = req.user.userId;
        return ok(this.messageService.markReaded(userId, senderId), "Updated succesfully!");
    }

    @Get(":userA/:userB")
    async getConservation(
        @Param("userA") userA: string,
        @Param("userB") userB: string,
        @Query("limit") limit: number,
        @Query("offset") offset: number
    ) {
        const data = await this.messageService.getConversation(userA, userB, limit, offset);
        return ok(data, "Success");
    }

    @UseGuards(JwtAuthGuard) // user đã login
    @Get("recent")
    async getRecentChats(@Req() req: AuthRequest, @Query("search") search?: string) {
        const userId = req.user.userId; // lấy từ JWT payload
        return ok(
            await this.messageService.getRecentChats(userId, search),
            "Get recent messages successfully!"
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get("unread")
    async getUnreadChats(@Req() req: AuthRequest, @Query("search") search?: string) {
        const userId = req.user.userId;
        return ok(
            await this.messageService.getUnseenChats(userId, search),
            "Get unread chats successfully!"
        );
    }
}