import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { MailService } from "./mail/mail.service";
import { RedisService } from "./redis.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UserModule,
        JwtModule.register({}),
        PassportModule.register({
            defaultStrategy: "jwt"
        })
    ],
    providers: [AuthService, JwtStrategy, MailService, RedisService],
    controllers: [AuthController],
    exports: [PassportModule]
})

export class AuthModule { }