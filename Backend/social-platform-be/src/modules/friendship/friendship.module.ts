import { Module } from "@nestjs/common";
import { FriendshipController } from "./friendship.controller";
import { FriendshipService } from "./friendship.service";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Friendship } from "src/database/entities/friendship.entity";
import { RealtimeModule } from "src/gateway/realtime.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Friendship]),
        UserModule,
        RealtimeModule
    ],
    controllers: [FriendshipController],
    providers: [FriendshipService],
    exports: [FriendshipService]
})

export class FriendshipModule { }