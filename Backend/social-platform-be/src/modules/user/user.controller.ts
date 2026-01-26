import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import CreateUserDTO from "./dto/create-user-dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(":id")
    async getUserById(@Param("id") id: string) {
        return this.userService.getUserById(id);
    }

    @Post()
    async createUser(@Body() user: CreateUserDTO) {
        return this.userService.createUser(user);
    }
}