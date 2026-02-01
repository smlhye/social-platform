import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        UserModule,
        JwtModule.register({ }),
        PassportModule.register({
            defaultStrategy: "jwt"
        })
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [PassportModule]
})

export class AuthModule { }