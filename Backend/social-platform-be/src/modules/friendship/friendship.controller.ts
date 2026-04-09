import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { FriendshipService } from "./friendship.service";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import type { AuthRequest } from "../auth/types/auth-request.type";
import { ok } from "src/common/base/response.helper";
import { CreateFriendshipDTO } from "./dto/create-friendship-dto";

@Controller("friendship")
export class FriendshipController {
    constructor(private readonly friendshipService: FriendshipService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getFriends(@Req() req: AuthRequest) {
        const userId = req.user.userId;
        const friends = await this.friendshipService.getFriends(userId);
        return ok(friends, "Get friends list successful!");
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async sendFriendRequest(@Req() req: AuthRequest, @Body() dto: CreateFriendshipDTO) {
        const userId = req.user.userId;
        return ok(await this.friendshipService.sendFriendRequest(userId, dto), "Send request successfully!");
    }

    @UseGuards(JwtAuthGuard)
    @Delete("request/:id")
    async cancelRequest(@Req() req: AuthRequest, @Param("id") id: string) {
        const userId = req.user.userId;
        return this.friendshipService.cancelRequest(userId, id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/requester")
    async getInboxRequests(@Req() req: AuthRequest) {
        const userId = req.user.userId;
        return ok(await this.friendshipService.getInboxRequests(userId), "Get friend receives successfully!");
    }

    @UseGuards(JwtAuthGuard)
    @Get("/addressee")
    async getSentRequests(@Req() req: AuthRequest) {
        const userId = req.user.userId;
        return ok(await this.friendshipService.getSentRequests(userId), "Get friend requests successfully!");
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/:id/accept")
    async acceptedRequest(@Req() req: AuthRequest, @Param("id") requestId: string) {
        const userId = req.user.userId;
        return ok(await this.friendshipService.handleRequest(userId, requestId, true), "Accepted request successfully");
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id/decline")
    async declineRequest(@Req() req: AuthRequest, @Param("id") requestId: string) {
        const userId = req.user.userId;
        return ok(await this.friendshipService.handleRequest(userId, requestId, false), "Decline request successfully");
    }
}