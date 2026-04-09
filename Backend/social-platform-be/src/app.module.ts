import { Module } from "@nestjs/common";
import { ConfigModule, DATABASE_CONFIG } from "./config";
import { DatabaseModule } from "./database";
import { HealthModule } from "./modules/health/health.module";
import { UserModule } from "./modules/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./modules/auth/auth.module";
import { MessageModule } from "./modules/message/message.module";
import { FriendshipModule } from "./modules/friendship/friendship.module";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [DATABASE_CONFIG],
            useFactory: (dbConfig) => ({
                type: 'postgres',
                host: dbConfig.host,
                port: dbConfig.port,
                username: dbConfig.username,
                password: dbConfig.password,
                database: dbConfig.database,
                autoLoadEntities: true,
                synchronize: false,
            }),
        }),
        HealthModule,
        UserModule,
        AuthModule,
        MessageModule,
        FriendshipModule
    ]
}) export class AppModule { }