import { InjectRepository } from "@nestjs/typeorm";
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Notification } from "src/database/entities/notification.entity";
import { User } from "src/database/entities/user.entity";
import { CreateNotificationDTO } from "src/modules/friendship/dto/create-notification.dto";
import { SendMessageDTO } from "src/modules/message/dto/send_message.dto";
import { Repository } from "typeorm";

@WebSocketGateway({
    cors: { origin: "*" }
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    private onlineUsers = new Map<string, number>();

    handleConnection(socket: Socket) {
        const userId = socket.handshake.query.userId as string;

        if (!userId) return;

        console.log("🟢 CONNECT:", userId, "| socketId:", socket.id);

        socket.join(`user:${userId}`);

        const count = this.onlineUsers.get(userId) || 0;
        this.onlineUsers.set(userId, count + 1);

        console.log("👉 AFTER CONNECT COUNT:", this.onlineUsers.get(userId));

        if (count === 0) {
            this.server.emit("userOnline", { userId });
            console.log("📡 EMIT userOnline:", userId);
        }
    }

    async handleDisconnect(socket: Socket) {
        const userId = socket.handshake.query.userId as string;

        if (!userId) return;

        console.log("🔴 DISCONNECT:", userId, "| socketId:", socket.id);

        const count = this.onlineUsers.get(userId) || 0;

        console.log("👉 BEFORE DISCONNECT COUNT:", count);

        if (count <= 1) {
            this.onlineUsers.delete(userId);
            await this.userRepository.update(userId, {
                lastSeen: new Date()
            });

            this.server.emit("userOffline", { userId, lastSeen: new Date() });

            console.log("📡 EMIT userOffline:", userId);
        } else {
            this.onlineUsers.set(userId, count - 1);
        }

        console.log("👉 AFTER DISCONNECT COUNT:", this.onlineUsers.get(userId));
    }

    isUserOnline(userId: string) {
        return this.onlineUsers.has(userId);
    }

    sendMessage(senderId: string, receiverId: string, message: SendMessageDTO) {
        this.server.to(`user:${receiverId}`).emit("receiveMessage", message);
        this.server.to(`user:${senderId}`).emit("receiveMessage", message);
        console.log(`[BE] Emitted to rooms: user:${receiverId}, user:${senderId}`);
    }

    sendNotification(receiverId: string, notification: CreateNotificationDTO) {
        this.server.to(`user:${receiverId}`).emit("notification", notification);
    }

    sendMessagesRead(readerId: string, friendId: string) {
        this.server.to(`user:${friendId}`).emit("messagesRead", {
            readerId
        });
    }

}