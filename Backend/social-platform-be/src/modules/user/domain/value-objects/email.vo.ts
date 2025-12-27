import { ValueObject } from "src/common/base/base.value-object";

interface EmailProps {
    value: string;
}

export class Email extends ValueObject<EmailProps> {
    private constructor(props: EmailProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    static create(value: string): Email {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
            throw new Error('Invalid email');
        }
        return new Email({ value })
    }
}