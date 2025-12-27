import { ValueObject } from "src/common/base/base.value-object";

interface NameProps {
    value: string;
}

export class Name extends ValueObject<NameProps> {
    private static readonly MIN_LENGTH = 1;
    private static readonly MAX_LENGTH = 50;

    private constructor(props: NameProps) {
        super(props);
    }

    get value(): string {
        return this.props.value
    }

    static create(value: string): Name {
        const normalized = value?.trim();

        if (!normalized) {
            throw new Error('Name cannot be empty');
        }

        if (
            normalized.length < this.MIN_LENGTH ||
            normalized.length > this.MAX_LENGTH
        ) {
            throw new Error(
                `Name must be between ${this.MIN_LENGTH} and ${this.MAX_LENGTH} characters`,
            );
        }

        return new Name({ value: normalized });
    }
}