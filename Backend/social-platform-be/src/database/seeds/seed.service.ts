import { DataSource } from "typeorm";
import { Gender, User } from "../entities/user.entity";
import * as bcrypt from 'bcrypt';

export class SeedService {
    constructor(private dataSource: DataSource) { }

    async seedUsers() {
        const userRepo = this.dataSource.getRepository(User);

        const existingAdmin = await userRepo.findOne({ where: { username: 'admin' } });
        if (existingAdmin) return;

        const admin = userRepo.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            username: 'admin',
            password: await bcrypt.hash('admin123', 10),
            dob: '1990-01-01',
            gender: Gender.OTHER,
            phoneNumber: '0987654321',
        })

        await userRepo.save(admin);

    }

    async runAll() {
        await this.seedUsers();
    }
}