import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import SignInDTO from "./dto/SignInDTO";
import { RedisService } from "./redis.service";
import { MailService } from "./mail/mail.service";
import { Repository } from "typeorm";
import { User } from "src/database/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
        private readonly mailService: MailService
    ) { }

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

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET!,
            expiresIn: signInDTO.rememberMe ? process.env.JWT_REFRESH_EXPIRES_IN as JwtSignOptions["expiresIn"] : '1d',
        });

        return {
            tokens: {
                accessToken,
                refreshToken
            }
        }
    }

    async getCurrentUser(payload: { userId: string, username: string }) {
        const user = await this.userService.findActiveUserById(payload.userId);
        if (!user) {
            throw new UnauthorizedException("User not found!");
        }
        return {
            id: user.id,
            avatar: user.avatarURL,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            email: user.email,
            phoneNumber: user.phoneNumber
        }
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET!,
            });

            const newAccessToken = await this.jwtService.signAsync(
                {
                    sub: payload.sub,
                    username: payload.username
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET!,
                    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as JwtSignOptions["expiresIn"]
                }
            );

            return {
                accessToken: newAccessToken
            };
        } catch (error) {
            throw new UnauthorizedException("Invalid refresh token");
        }
    }

    generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async forgotPassword(email: string) {
        const user = await this.userRepo.findOne({ where: { email, isDeleted: false } });
        if (!user) throw new NotFoundException("This email is not exist!");

        const isCooldown = await this.redisService.hasCooldown(email);
        if (isCooldown) throw new BadRequestException("Please wait 5 minutes to request new OTP!")

        const otp = this.generateOtp();

        await this.redisService.setOtp(email, otp);
        await this.redisService.setCooldown(email);
        await this.mailService.sendOtp(email, otp);
    }

    async resetPassword(email: string, otp: string, newPassword: string) {
        const storedOtp = await this.redisService.getOtp(email);

        if (!storedOtp || storedOtp !== otp) {
            throw new BadRequestException("Invalid of expired OTP!");
        }

        const user = await this.userRepo.findOne({ where: { email, isDeleted: false } });
        if (!user) throw new NotFoundException("User not found!");

        user.password = await bcrypt.hash(newPassword, 10);
        await this.userRepo.save(user);

        await this.redisService.deleteOtp(email);
    }
}