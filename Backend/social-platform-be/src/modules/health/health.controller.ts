import { Controller, Get } from "@nestjs/common";
import { HealthService } from "./health.service";

@Controller('system')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get('health')
    async check() {
        return this.healthService.checkApp();
    }

    @Get('ping')
    ping() {
        return {
            message: 'pong',
        }
    }
}