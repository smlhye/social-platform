import { UserRepository } from "../domain/repositories/user.repository";
import { Email } from "../domain/value-objects/email.vo";

export class UpdateUserUseCase {
    constructor(private repo: UserRepository) { }

    async execute(id: string, name: string, email: string) {
        const user = await this.repo.findById(id);
        if (!user) throw new Error('User not found');

        user.update(name, Email.create(email));
        await this.repo.save(user);
    }
}