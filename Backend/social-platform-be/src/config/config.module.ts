import { Module } from "@nestjs/common";
import { ConfigService, ConfigModule as NestConfigModule } from "@nestjs/config";
import * as dotenv from 'dotenv';
import { EnvSchema } from "./env.schema";
import { treeifyError } from "zod";
import { configGetters } from "./app.config";

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            load: [() => { dotenv.config(); return {}; }],
            validate: (env) => {
                const result = EnvSchema.safeParse(env);
                if (!result.success) {
                    console.error('Invalid ENV config:');
                    console.error(treeifyError(result.error));
                    process.exit(1);
                }
                return result.data;
            },
        })
    ],
    providers: configGetters.map(({ token, factory }) => ({
        provide: token,
        inject: [ConfigService],
        useFactory: factory,
    })),
    exports: configGetters.map(({ token }) => token),
}) export class ConfigModule { }