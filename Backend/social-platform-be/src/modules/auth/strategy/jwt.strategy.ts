import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../types/jwt-payload.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req?.cookies?.ACCESS_TOKEN,
            ]),
            secretOrKey: process.env.JWT_ACCESS_SECRET!,
        });
    }

    async validate(payload: JwtPayload) {
        if (!payload?.sub) {
            throw new UnauthorizedException();
        }
        return {
            userId: payload.sub,
            username: payload.username
        }
    }
}