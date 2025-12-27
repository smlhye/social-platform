export class CreateUserDTO {
    id?: string;
    username: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(props: Partial<CreateUserDTO>) {
        Object.assign(this, props);
    }
}