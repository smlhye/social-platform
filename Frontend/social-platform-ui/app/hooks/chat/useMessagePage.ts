"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "next/navigation";
import { MessageListResponse, MessageResponse, RecentChatListResponse, RecentChatResponse } from "@/app/schemas/message.schema";
import { useCurrentUser } from "../useAuth";
import { useConversationInfinite, useMarkAsRead, useRecentMesList, useSendMessage } from "../useMessage";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/app/schemas/common.schema";

export function useMessagePage() {
    const params = useParams();
    const receiverId = Array.isArray(params.userId) ? params.userId[0] : params.userId;
    const { data: me } = useCurrentUser();
    const currentUserId = me?.resData.id;

    // Sidebar
    const { data: recentChats, isLoading: isRecentLoading } = useRecentMesList();
    const [recentList, setRecentList] = useState<RecentChatListResponse>([]);

    useEffect(() => {
        if (!recentChats?.resData) return;
        setRecentList(recentChats.resData.map((item: RecentChatResponse) => ({
            friendId: item.friendId,
            avatar: item.avatar,
            fullName: item.fullName,
            lastMessage: item.lastMessage,
            lastMessageAt: item.lastMessageAt,
            unreadCount: item.unreadCount || 0,
            isOnline: item.isOnline
        })));
    }, [recentChats]);

    // Messages
    const [lastAddedId, setLastAddedId] = useState<string | null>(null);
    const messageCache = useRef<Record<string, MessageListResponse>>({});
    const scrollRef = useRef<HTMLDivElement>(null);
    const prevScrollHeight = useRef(0);
    const isAtBottomRef = useRef(true);
    const isFirstLoadRef = useRef(true);

    const {
        data: messagesData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useConversationInfinite(currentUserId, receiverId);

    const messagesLazy = messagesData?.pages.flatMap(page => page.resData ?? []) ?? [];
    

    // Socket
    const socketRef = useRef<Socket | null>(null);
    const markAsReadMutation = useMarkAsRead();
    const sendMessageMutation = useSendMessage();

    const queryClient = useQueryClient();

    useEffect(() => {
        if (!currentUserId) return;
        if (!socketRef.current) {
            socketRef.current = io("http://localhost:5000", { query: { userId: currentUserId } });
        }
        const socket = socketRef.current;

        const handleReceiveMessage = (msg: MessageResponse) => {
            const fid = msg.senderId === currentUserId ? msg.receiverId : msg.senderId;

            console.log("==== DEBUG SOCKET ====");
            console.log("msg:", msg);
            console.log("currentUserId:", currentUserId);
            console.log("receiverId:", receiverId);
            console.log("fid:", fid);
            console.log("fid === receiverId ?", fid === receiverId);

            // Update sidebar
            setRecentList(prev => {
                const updated = [...prev];
                const index = updated.findIndex(u => u.friendId === fid);
                if (index !== -1) {
                    const item = updated[index];
                    updated.splice(index, 1);
                    updated.unshift({ ...item, lastMessage: msg.content, lastMessageAt: msg.createdAt, unreadCount: fid === receiverId ? 0 : (item.unreadCount || 0) + 1 });
                }
                return updated;
            });

            // Update chat
            if (fid === receiverId) {

                queryClient.setQueryData<
                    InfiniteData<ApiResponse<MessageListResponse>>
                >(
                    ["conversation", currentUserId, receiverId],
                    (old) => {
                        if (!old) return old;

                        const firstPage = old.pages[0];
                        const currentMessages = firstPage.resData ?? [];

                        // tránh duplicate
                        if (currentMessages.some(m => m.id === msg.id)) {
                            return old;
                        }

                        const newFirstPage: ApiResponse<MessageListResponse> = {
                            ...firstPage,
                            resData: [msg, ...currentMessages] // vẫn unshift
                        };

                        const newPages = [...old.pages];
                        newPages[0] = newFirstPage;

                        return {
                            ...old,
                            pages: newPages,
                            pageParams: old.pageParams
                        };
                    }
                );

                markAsReadMutation.mutate(receiverId, {
                    onSuccess: () => {
                        setRecentList(prev => prev.map(item => item.friendId === receiverId ? { ...item, unreadCount: 0 } : item));
                    }
                });
            } else {
                console.log("[FE] Message for another user, not updating chat area");
            }
        };

        socket.off("receiveMessage");
        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, [currentUserId, receiverId]);

    useEffect(() => {
        if (!receiverId) return;

        markAsReadMutation.mutate(receiverId);

        setRecentList(prev =>
            prev.map(item =>
                String(item.friendId) === String(receiverId)
                    ? { ...item, unreadCount: 0 }
                    : item
            )
        );
    }, [receiverId]);

    // Send
    const handleSendMessage = (content: string) => {
        if (!receiverId) return;
        sendMessageMutation.mutate({ receiverId, content }, {
            onSuccess: res => {
                const newMsg = res.resData;
                if (!newMsg) return;

                setRecentList(prev => {
                    const updated = [...prev];
                    const index = updated.findIndex(u => u.friendId === receiverId);
                    if (index !== -1) {
                        const item = updated[index];
                        updated.splice(index, 1);
                        updated.unshift({ ...item, lastMessage: content, lastMessageAt: newMsg.createdAt });
                    }
                    return updated;
                });
            }
        });
    };

    // InfoBar + Tab
    const [tab, setTab] = useState(0);
    const [infoBar, setInfoBar] = useState(false);

    return {
        hasMore: hasNextPage,
        loadingMore: isFetchingNextPage,
        loadMore: fetchNextPage,
        currentUserId,
        recentList,
        tab,
        setTab,
        infoBar,
        setInfoBar,
        messagesLazy,
        scrollRef,
        handleSendMessage,
        isLoading,
        isRecentLoading,
        lastAddedId
    };
}