import { IUserRepository } from "../../domain/repositories/user.repo";
import { CreateUserDTO } from "../dto/create-user.dto";
import { UserMapper } from "../mappers/user.mapper";

export class CreateUserUseCase {
    constructor(private readonly userRepo: IUserRepository) { }

    async execute(dto: CreateUserDTO) {
        const user = new UserMapper().toEntity(dto);
        const savedUser = await this.userRepo.create(user);
        return new UserMapper().toDTO(savedUser);
    }
}