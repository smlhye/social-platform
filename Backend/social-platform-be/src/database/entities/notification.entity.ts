import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum NotificationType {
    MESSAGE = "message",
    FRIEND_REQUEST = "friend_request",
    FRIEND_ACCEPTED = "friend_accepted"
}

@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    senderId: string;

    @Column({ nullable: true })
    senderName: string

    @ManyToOne(() => User)
    @JoinColumn({ name: "receiverId" })
    receiver: User;

    @Column({
        type: "enum",
        enum: NotificationType,
    })
    type: NotificationType;

    @Column({ nullable: true })
    content: string;

    @Column({ default: false })
    isRead: boolean;

    @CreateDateColumn()
    createdAt: Date;
}