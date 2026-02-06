import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Request, Response } from "express";
import SignInDTO from "./dto/SignInDTO";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import type { AuthRequest } from "./types/auth-request.type";
import { ok } from "src/common/base/response.helper";

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

        res.cookie('REFRESH_TOKEN', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: signInDTO.rememberMe
                ? 7 * 24 * 60 * 60 * 1000
                : 24 * 60 * 60 * 1000,
            path: '/',
        });

        return ok({ accessToken }, "Logged in successful!");
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    async getMe(@Req() req: AuthRequest) {
        const user = await this.authService.getCurrentUser(req.user);
        return ok(user, "Get user information successful!");
    }

    @Post("sign-out")
    async signOut(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('ACCESS_TOKEN', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })
        res.clearCookie('REFRESH_TOKEN', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return ok(null, "Logged out successful!");
    }
}