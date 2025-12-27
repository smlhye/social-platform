import { ValueObject } from "src/common/base/base.value-object";

interface HashedPasswordProps {
    value: string;
}

export class HashedPassword extends ValueObject<HashedPasswordProps> {
    private constructor(props: HashedPasswordProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    static create(hashed: string): HashedPassword {
        if (!hashed) throw new Error('Invalid hashed password');
        return new HashedPassword({ value: hashed })
    }
}