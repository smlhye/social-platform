import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import SignInDTO from "./dto/SignInDTO";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async signIn(signInDTO: SignInDTO) {
        const user = await this.userService.findActiveUserForAuth(signInDTO.username);

        if (!user) throw new UnauthorizedException("Username or password is incorrect!");

        const isPasswordValid = await bcrypt.compare(signInDTO.password, user.password);

        if (!isPasswordValid) throw new UnauthorizedException("Username or password is incorrect!");

        const payload = {
            sub: user.id,
            username: user.username
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_ACCESS_SECRET!,
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as JwtSignOptions["expiresIn"],
        });

        const refreshToken = signInDTO.rememberMe ? await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET!,
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as JwtSignOptions["expiresIn"],
        }) : null;

        return {
            tokens: {
                accessToken,
                refreshToken
            }
        }
    }
}