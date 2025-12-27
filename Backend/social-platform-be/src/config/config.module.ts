import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";
import dbConfig from "./db.config";
import jwtConfig from "./jwt.config";
import { envValidationSchema } from "./env.validation";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [dbConfig, jwtConfig],
            validationSchema: envValidationSchema,
        })
    ]
})
export class AppConfigModule { }