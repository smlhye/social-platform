import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io';
import { SendMessageDTO } from './dto/send_message.dto';

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server

    handleConnection(socket: Socket) {
        const userId = socket.handshake.query.userId;
        if (userId) {
            socket.join(`user:${userId}`)
            console.log(`User ${userId} joined room user:${userId}`)
        }
    }

    handleDisconnect(socket: Socket) {
        console.log("User disconnected:", socket.id)
    }

    sendMessage(senderId: string, receiverId: string, message: SendMessageDTO) {

        this.server
            .to(`user:${receiverId}`)
            .emit("receiveMessage", message)

        this.server
            .to(`user:${senderId}`)
            .emit("receiveMessage", message);
    }
}