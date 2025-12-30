import { User } from "../domain/entities/user.entity";
import { UserRepository } from "../domain/repositories/user.repository";
import { Email } from "../domain/value-objects/email.vo";

export class CreateUserUseCase {
    constructor(
        private readonly repo: UserRepository,
    ) { }

    async execute(name: string, email: string) {
        const user = User.create({
            name,
            email: Email.create(email),
        });

        await this.repo.save(user);
        return user.toPrimitives();
    }
}