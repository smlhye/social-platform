import { ApiResponse } from "../schemas/common.schema";
import { MessageListResponse, MessageResponse, RecentChatListResponse, SendMessagePayload } from "../schemas/message.schema";
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

    markedRead: (friendId: string) => {
        console.log(`${END_POINTS.chat}/read/${friendId}`)
        return apiGateway<ApiResponse<null>>(
            `${END_POINTS.chat.base}/read/${friendId}`,
            {
                method: "PATCH"
            }
        )
    },

    getConversation: (userA: string, userB: string, offset: number = 0) =>
        apiGateway<ApiResponse<MessageListResponse>>(
            END_POINTS.chat.conversation(userA, userB),
            {
                method: "GET",
                params: {
                    limit: 15,
                    offset
                }
            }
        ),

    getRecentChats: () =>
        apiGateway<ApiResponse<RecentChatListResponse>>(
            END_POINTS.chat.recent,
            {
                method: "GET"
            }
        ),


}