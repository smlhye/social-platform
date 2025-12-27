import { ValueObject } from "src/common/base/base.value-object";

interface UsernameProps {
    value: string;
}

export class Username extends ValueObject<UsernameProps> {
    private static readonly MIN_LENGTH = 6;
    private static readonly MAX_LENGTH = 50;

    private constructor(props: UsernameProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    static create(value: string): Username {
        const normalized = value?.trim();

        if (!normalized) {
            throw new Error('Username cannot be empty');
        }

        if (
            normalized.length < this.MIN_LENGTH ||
            normalized.length > this.MAX_LENGTH
        ) {
            throw new Error(
                `Username must be between ${this.MIN_LENGTH} and ${this.MAX_LENGTH} characters`,
            );
        }

        return new Username({ value: normalized });
    }
}