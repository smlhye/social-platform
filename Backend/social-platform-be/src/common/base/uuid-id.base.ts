import { randomUUID } from "crypto";
import { ValueObject } from "./value-object.base";

interface UUIDProps {
    value: string;
}

export class UUID extends ValueObject<UUIDProps> {
    protected constructor(props: UUIDProps) {
        super(props);
    }

    static create(id?: string): UUID {
        return new UUID({ value: id ?? randomUUID() });
    }

    toString(): string {
        return this.props.value;
    }
}