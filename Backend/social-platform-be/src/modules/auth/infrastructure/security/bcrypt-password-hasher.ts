import { PasswordHasher } from "../../domain/services/password-hasher.service";
import * as bcrypt from "bcrypt";

export class BcryptPasswordHasher implements PasswordHasher {
    private static readonly SALT = 10;

    hash(plain: string): Promise<string> {
        return bcrypt.hash(plain, BcryptPasswordHasher.SALT)
    }
    compare(plain: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(plain, hashed);
    }
}