import { User } from "../domain/entities/user.entity";
import { Email } from "../domain/value-objects/email.vo";
import { UserId } from "../domain/value-objects/user-id.vo";
import { UserOrmEntity } from "./orm/user.orm-entity";

export class UserMapper {
    static toDomain(entity: UserOrmEntity): User {
        return User.create({
            id: UserId.create(entity.id),
            name: entity.name,
            email: Email.create(entity.email),
        });
    }

    static toOrm(user: User): UserOrmEntity {
        const orm = new UserOrmEntity();
        const data = user.toPrimitives();

        orm.id = data.id;
        orm.name = data.name;
        orm.email = data.email;

        return orm;
    }
}
