import { BaseRepository } from "src/common/base/base.repository";
import { User } from "../entities/user.entity";

export interface IUserRepository extends BaseRepository<User> {
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}