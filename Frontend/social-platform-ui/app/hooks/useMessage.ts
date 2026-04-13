import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { MessageAPI } from "../api/message.api";
import { ApiResponse } from "../schemas/common.schema";
import { MessageListResponse, MessageResponse, RecentChatListResponse, SendMessagePayload } from "../schemas/message.schema";

export const useConversation = (userA?: string, userB?: string, offset: number = 0) => {
    return useQuery<ApiResponse<MessageListResponse>>({
        queryKey: ["conversation", userA, userB, offset],
        queryFn: () => MessageAPI.getConversation(userA!, userB!, offset),
        enabled: !!userA && !!userB,
    });
};

export const useConversationInfinite = (userA?: string, userB?: string) => {
    return useInfiniteQuery<ApiResponse<MessageListResponse>, Error>({
        queryKey: ["conversation", userA, userB],
        queryFn: ({ pageParam }) =>
            MessageAPI.getConversation(userA!, userB!, pageParam as number),
        enabled: !!userA && !!userB,
        getNextPageParam: (lastPage, pages) => {
            // lastPage: ApiResponse<MessageListResponse>
            const messages = lastPage.resData ?? [];
            return messages.length < 15 ? undefined : pages.length * 15;
        },
        initialPageParam: 0,
    });
};

export const useMarkAsRead = () => {
    return useMutation<ApiResponse<null>, Error, string>({
        mutationFn: (friendId: string) => MessageAPI.markedRead(friendId)
    });
};

export const useSendMessage = () => {
    return useMutation<ApiResponse<MessageResponse>, Error, SendMessagePayload>({
        mutationFn: MessageAPI.sendMessage
    });
};

export const useChatList = (tab: number, search?: string) => {
    return useQuery<ApiResponse<RecentChatListResponse>>({
        queryKey: ["chats", tab, search],
        queryFn: () =>
            tab === 0
                ? MessageAPI.getRecentChats(search)
                : MessageAPI.getUnreadChats(search),
        placeholderData: (prev) => prev
    });
};