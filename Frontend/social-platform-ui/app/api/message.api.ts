import { ApiResponse } from "../schemas/common.schema";
import { MessageListResponse, MessageResponse, SendMessagePayload } from "../schemas/message.schema";
import { apiGateway } from "./apiGateway";
import { END_POINTS } from "./config";

export const MessageAPI = {
    sendMessage: (payload: SendMessagePayload) =>
        apiGateway<ApiResponse<MessageResponse>, SendMessagePayload>(
            END_POINTS.chat.send,
            {
                method: "POST",
                data: payload
            }
        ),
    getConversation: (userA: string, userB: string) =>
        apiGateway<ApiResponse<MessageListResponse>>(
            END_POINTS.chat.conversation(userA, userB),
            {
                method: "GET"
            }
        )
}