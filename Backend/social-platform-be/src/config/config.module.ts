import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envValidationSchema } from "./env.validation";
import configArray from '../config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [configArray],
            validationSchema: envValidationSchema,
        })
    ]
})
export class AppConfigModule { }