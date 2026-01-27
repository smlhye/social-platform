import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/database";
import { Repository } from "typeorm";
import CreateUserDTO from "./dto/create-user-dto";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "node_modules/bcryptjs";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    async getAllUsers(): Promise<User[]> {
        return this.repo.find({
            where: { isDeleted: false }
        })
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.repo.findOne({
            where: { id, isDeleted: false }
        })
        if (!user) throw new NotFoundException("User is not exists!");
        return user;
    }

    async checkEmail(email: string) {
        if (!email) return;
        const existed = await this.repo.findOne({
            where: { email }
        })
        if (existed) throw new ConflictException("Email already exists");
    }

    async checkUsername(username: string) {
        if (!username) return;
        const existed = await this.repo.findOne({
            where: { username }
        })
        if (existed) throw new ConflictException("Username already exists");
    }

    async createUser(user: CreateUserDTO): Promise<User> {
        await this.checkEmail(user.email);
        await this.checkUsername(user.username);

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const newUser = this.repo.create({
            ...user,
            password: hashedPassword,
            dob: new Date(user.dob),
        })

        return this.repo.save(newUser);
    }

    async findActiveUserForAuth(username: string) {
        return this.repo.findOne({
            where: {
                username,
                isDeleted: false
            },
            select: ["id", "username", "password"]
        })
    }
}