import { Body, Controller, Get, Param, Patch, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import CreateUserDTO from "./dto/create-user-dto";
import { UserService } from "./user.service";
import { ok } from "src/common/base/response.helper";
import UpdateUserDTO from "./dto/update-user-dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import type { AuthRequest } from "../auth/types/auth-request.type";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers(@Req() req: AuthRequest) {
        const userId = req.user.userId;
        return ok(await this.userService.getAllUsers(userId), "Get user list successful!");
    }

    @UseGuards(JwtAuthGuard)
    @Get("suggestion")
    async getSuggestionUsers(
        @Req() req: AuthRequest,
        @Query("search") search?: string,
        @Query("page") page: number = 1,
        @Query("limit") limit: number = 10
    ) {
        const userId = req.user.userId;
        return ok(await this.userService.getSuggestionUser(userId, search, page, limit), "Get list users successful!");
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getUserById(@Req() req: AuthRequest, @Param("id") id: string) {
        const userId = req.user.userId;
        return ok(await this.userService.getUserById(userId, id), "Get user information successfully!");
    }

    @Post()
    async createUser(@Body() user: CreateUserDTO) {
        return this.userService.createUser(user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async updateUser(@Param("id") id: string, @Body() user: UpdateUserDTO) {
        return ok(await this.userService.updateUser(id, user), "Update user successful");
    }

    @Post(":id/avatar")
    @UseInterceptors(FileInterceptor('file'))
    async uploadAvatar(@Param("id") id: string, @UploadedFile() file: Express.Multer.File) {
        return ok(await this.userService.updateAvatar(id, file), "Upload file successful");
    }
}