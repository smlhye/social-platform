import { AggregateRoot } from "./aggregate-root.base";

export abstract class AuditableEntity<TId> extends AggregateRoot<TId> {
    protected readonly createdAt: Date;
    protected updatedAt: Date;

    protected constructor(id: TId, createdAt?: Date, updatedAt?: Date) {
        super(id);
        const now = new Date();
        this.createdAt = now;
        this.updatedAt = now;
    }

    protected update() {
        this.updatedAt = new Date();
    }
}