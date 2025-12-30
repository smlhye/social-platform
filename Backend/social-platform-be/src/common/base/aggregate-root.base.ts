import { EntityBase } from "./entity.base";

export abstract class AggregateRoot<TId> extends EntityBase<TId> {
    private domainEvents: any[] = [];

    protected addEvent(event: any): void {
        this.domainEvents.push(event);
    }

    pullEvents(): any[] {
        const events = [...this.domainEvents];
        this.domainEvents = [];
        return events;
    }
}