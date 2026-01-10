import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class HealthService {
    constructor(private dataSource: DataSource) { }
    async checkDatabase(): Promise<boolean> {
        try {
            await this.dataSource.query('SELECT 1');
            return true;
        } catch {
            return false;
        }
    }

    async checkApp(): Promise<{ status: string; db: boolean }> {
        const dbHealthy = await this.checkDatabase();
        return {
            status: 'ok',
            db: dbHealthy,
        }
    }
}