import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../domain/repositories/user.repository";
import { UserOrmEntity } from "./orm/user.orm-entity";
import { Repository } from "typeorm";
import { User } from "../domain/entities/user.entity";
import { UserId } from "../domain/value-objects/user-id.vo";
import { Email } from "../domain/value-objects/email.vo";
import { UserMapper } from "./user.mapper";

export class UserRepositoryImpl implements UserRepository {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly repo: Repository<UserOrmEntity>,
    ) { }
    async save(user: User): Promise<void> {
        await this.repo.save(UserMapper.toOrm(user));
    }
    async findById(id: string): Promise<User | null> {
        const entity = await this.repo.findOneBy({ id });
        return entity ? UserMapper.toDomain(entity) : null;
    }
    async findAll(): Promise<User[]> {
        return (await this.repo.find()).map(UserMapper.toDomain);
    }
    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}