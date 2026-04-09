import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Notification } from "src/database/entities/notification.entity";
import { CreateNotificationDTO } from "src/modules/friendship/dto/create-notification.dto";
import { SendMessageDTO } from "src/modules/message/dto/send_message.dto";

@WebSocketGateway({
    cors: { origin: "*" }
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    private onlineUsers = new Map<string, number>();

    handleConnection(socket: Socket) {
        const userId = socket.handshake.query.userId as string;

        if (!userId) return;

        socket.join(`user:${userId}`);

        const count = this.onlineUsers.get(userId) || 0;
        this.onlineUsers.set(userId, count + 1);

        if (count === 0) {
            this.server.emit("userOnline", { userId });
        }
        console.log(`User ${userId} connected`);
    }

    handleDisconnect(socket: Socket) {
        const userId = socket.handshake.query.userId as string;
        if (!userId) return;

        const count = this.onlineUsers.get(userId) || 0;

        if (count <= 1) {
            this.onlineUsers.delete(userId);
            this.server.emit("userOffline", { userId });
        } else {
            this.onlineUsers.set(userId, count - 1);
        }

        console.log(`User ${userId} disconnected`);
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