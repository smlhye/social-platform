import z from "zod";

export const SendMessageSchema = z.object({
    receiverId: z.string().uuid(),
    content: z.string().min(1)
});
export type SendMessagePayload = z.infer<typeof SendMessageSchema>;

export const MessageSchema = z.object({
    id: z.string().uuid(),
    content: z.string().min(1),
    senderId: z.string().uuid(),
    receiverId: z.string().uuid(),
    createdAt: z.string()
});
export const MessageListSchema = z.array(MessageSchema);

export type MessageResponse = z.infer<typeof MessageSchema>;
export type MessageListResponse = z.infer<typeof MessageListSchema>;


export const RecentChatSchema = z.object({
    friendId: z.string().uuid(),
    fullName: z.string(),
    avatar: z.string(),
    lastMessage: z.string(),
    lastMessageAt: z.string(),
    unreadCount: z.number(),
    isOnline: z.boolean()
});
export const RecentChatList = z.array(RecentChatSchema);
export type RecentChatResponse = z.infer<typeof RecentChatSchema>;
export type RecentChatListResponse = z.infer<typeof RecentChatList>;