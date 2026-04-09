import z from "zod"

export const FriendSchema = z.object({
    id: z.string().uuid(),
    username: z.string(),
    fullName: z.string(),
    avatar: z.string().optional(),
    isOnline: z.boolean()
})
export const FriendListSchema = z.array(FriendSchema);

export type FriendResponse = z.infer<typeof FriendSchema>;
export type FriendListResponse = z.infer<typeof FriendListSchema>;

export const InboxRequestSchema = z.object({
    id: z.string(),
    senderId: z.string(),
    senderName: z.string(),
    avatar: z.string()
});

export const InboxRequestListSchema = z.array(InboxRequestSchema);

export type InboxRequest = z.infer<typeof InboxRequestSchema>;
export type InboxRequestList = z.infer<typeof InboxRequestListSchema>;

export const SendRequestSchema = z.object({
    addresseeId: z.string().uuid()
})
export type SendRequestPayload = z.infer<typeof SendRequestSchema>;