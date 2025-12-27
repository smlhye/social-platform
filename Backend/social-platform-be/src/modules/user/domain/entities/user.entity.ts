import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity, Index } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
    @Index({ unique: true })
    @Column({ unique: true, length: 50 })
    username: string;

    @Column({ name: "hashed_password" })
    private hashedPassword: string;

    @Column({ name: "first_name", length: 50 })
    firstName: string;

    @Column({ name: "last_name", length: 100 })
    lastName: string;

    @Index({ unique: true })
    @Column({ unique: true })
    email: string;

    @Column({ name: 'phone_number', length: 20, nullable: true })
    phoneNumber: string;

    @Column({ name: 'verify_email', default: false })
    verifyEmail: boolean;

    @Column({ name: "is_deleted", default: false })
    isDeleted: boolean;
}