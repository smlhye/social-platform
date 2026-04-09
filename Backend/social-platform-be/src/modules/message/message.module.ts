import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "src/database/entities/message.entity";
import { UserModule } from "../user/user.module";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { MessageGateway } from "./message.gateway";
import { RealtimeModule } from "src/gateway/realtime.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Message]),
        UserModule,
        RealtimeModule
    ],
    controllers: [MessageController],
    providers: [MessageService, MessageGateway],
    exports: [MessageService, MessageGateway]
})
export class MessageModule { }