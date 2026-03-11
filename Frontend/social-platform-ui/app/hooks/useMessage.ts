import { useMutation, useQuery } from "@tanstack/react-query";
import { MessageAPI } from "../api/message.api";
import { ApiResponse } from "../schemas/common.schema";
import { MessageListResponse, MessageResponse, SendMessagePayload } from "../schemas/message.schema";

export const useConversation = (userA?: string, userB?: string) => {
    return useQuery<ApiResponse<MessageListResponse>>({
        queryKey: ["conversation", userA, userB],
        queryFn: () => MessageAPI.getConversation(userA!, userB!),
        enabled: !!userA && !!userB
    });
};

export const useSendMessage = () => {
    return useMutation<ApiResponse<MessageResponse>, Error, SendMessagePayload>({
        mutationFn: MessageAPI.sendMessage
    });
};