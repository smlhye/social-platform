import { BaseMapper } from "src/common/base/base.mapper";
import { CreateUserDTO } from "../dto/create-user.dto";
import { User } from "../../domain/entities/user.entity";

export class UserMapper extends BaseMapper<User, CreateUserDTO> {
    toEntity(dto: CreateUserDTO): User {
        throw new Error("Method not implemented.");
    }

    toDTO(entity: User): CreateUserDTO {
        return new CreateUserDTO({
            id: entity.id,
            username: entity.username,
            email: entity.email,
            firstName: entity.firstName,
            lastName: entity.lastName,
            phoneNumber: entity.phoneNumber,
            createdAt: entity.createdAt,
        });
    }
}