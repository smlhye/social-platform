import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "src/database/entities/user.entity";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { ConfigModule } from "src/config";
import { Friendship } from "src/database/entities/friendship.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Friendship]), ConfigModule],
    providers: [UserService, CloudinaryService],
    controllers: [UserController],
    exports: [UserService, TypeOrmModule],
})

export class UserModule { }