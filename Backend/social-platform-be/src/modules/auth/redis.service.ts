import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService {
    private client = new Redis({
        host: 'localhost',
        port: 6379
    })

    async setOtp(email: string, otp: string) {
        await this.client.set(`otp:${email}`, otp, 'EX', 300);
    }

    async getOtp(email: string) {
        return this.client.get(`otp:${email}`);
    }

    async deleteOtp(email: string) {
        await this.client.del(`otp:${email}`);
    }

    async setCooldown(email: string) {
        await this.client.set(`otp_cooldown:${email}`, "1", "EX", 120);
    }

    async hasCooldown(email: string) {
        return await this.client.exists(`otp_cooldown:${email}`);
    }
}