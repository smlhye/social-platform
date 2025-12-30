export abstract class EntityBase<TId> {
    protected readonly id: TId;

    protected constructor(id: TId) {
        this.id = id;
    }

    equals(entity?: EntityBase<TId>): boolean {
        if (!entity) return false;
        return this.id === entity.id;
    }

    getId(): TId {
        return this.id;
    }
}