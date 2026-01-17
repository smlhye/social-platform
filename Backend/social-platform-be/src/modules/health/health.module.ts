import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";

@Module({
    imports: [HealthService],
    controllers: [HealthController],
    exports: [HealthService],
}) export class HealthModule { }