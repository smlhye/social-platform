import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        UserModule,
        JwtModule.register({ }),
    ],
    providers: [AuthService],
    controllers: [AuthController]
})

export class AuthModule { }