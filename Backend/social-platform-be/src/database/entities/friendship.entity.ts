import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum FriendshipStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    BLOCKED = "blocked"
}

@Entity('friendships')
export class Friendship {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'requester_id' })
    requester: User

    @ManyToOne(() => User)
    @JoinColumn({ name: 'addressee_id' })
    addressee: User

    @Column({
        type: 'enum',
        enum: FriendshipStatus,
        default: FriendshipStatus.PENDING
    })
    status: FriendshipStatus

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date
}