import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { SignInDTO } from "./dto/SignInDTO";
import { UnauthorizedException } from "@nestjs/common";
import bcrypt from "node_modules/bcryptjs";

export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async signIn(signInDTO: SignInDTO) {
        const user = await this.userService.findActiveByUsername(signInDTO.username);

        if (!user) throw new UnauthorizedException("Username or password is incorrect!");

        const isMatch = await bcrypt.compare(signInDTO.username, user.password)
            throw new UnauthorizedException("Username or password is incorrect!");

        const payload = {
            sub: user?.id,
            username: user?.username
        };

        
    }
}