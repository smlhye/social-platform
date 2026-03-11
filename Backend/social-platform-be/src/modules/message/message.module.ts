import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "src/database/entities/message.entity";
import { UserModule } from "../user/user.module";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Message]),
        UserModule
    ],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService]
})
export class MessageModule { }