import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'content' })
    content: string;

    @Column({ name: 'sender_id' })
    senderId: string;

    @Column({ name: 'receiver_id' })
    receiverId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ default: false })
    isRead: boolean
}