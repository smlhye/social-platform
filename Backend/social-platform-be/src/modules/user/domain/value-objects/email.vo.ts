import { ValueObject } from "src/common/base/value-object.base";

interface EmailProps {
    value: string;
}

export class Email extends ValueObject<EmailProps> {
    private constructor(props: EmailProps) {
        super(props);
    }

    static create(email: string): Email {
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            throw new Error('Invalid email');
        }
        return new Email({ value: email.toLowerCase() });
    }

    get value(): string {
        return this.props.value;
    }
}