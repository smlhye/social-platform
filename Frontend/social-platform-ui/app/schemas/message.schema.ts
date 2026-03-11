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