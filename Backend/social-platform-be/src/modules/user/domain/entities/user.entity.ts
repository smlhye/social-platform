import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';
import { AuditableEntity } from 'src/common/base/auditable-entity.base';

export class User extends AuditableEntity<UserId> {
    private name: string;
    private email: Email;

    constructor(id: UserId, name: string, email: Email) {
        super(id);
        this.name = name;
        this.email = email;
    }

    updateProfile(name: string, email: Email) {
        this.name = name;
        this.email = email;
    }
}