export interface FriendItem {
    friendId: string,
    fullName: string,
    avatar?: string,
    lastMessage?: string,
    lastMessageAt?: string,
}

export interface Message {
    id: string;
    content: string;
    senderId: string;
    time: string; // string để dễ hiển thị, convert từ createdAt
}