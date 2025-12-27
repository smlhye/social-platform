import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.repo";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    findByUsername(username: string): Promise<User | null> {
        return this.repo.findOne({ where: { username } });
    }

    findByEmail(email: string): Promise<User | null> {
        return this.repo.findOne({ where: { email } });
    }

    findById(id: string): Promise<User | null> {
        return this.repo.findOne({ where: { id } });
    }

    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    create(data: User): Promise<User> {
        return this.repo.save(data);
    }

    update(id: string, data: Partial<User>): Promise<User> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}