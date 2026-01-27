import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Response } from "express";
import SignInDTO from "./dto/SignInDTO";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("sign-in")
    async signIn(@Body() signInDTO: SignInDTO, @Res({ passthrough: true }) res: Response) {
        const result = await this.authService.signIn(signInDTO);

        const { accessToken, refreshToken } = result.tokens;

        res.cookie('ACCESS_TOKEN', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 5 * 60 * 1000,
            path: '/',
        });

        if (signInDTO.rememberMe && refreshToken) {
            res.cookie('REFRESH_TOKEN', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/',
            });
        }

        return result;
    }
}