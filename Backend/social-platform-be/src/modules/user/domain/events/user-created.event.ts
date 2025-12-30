import { DomainEvent } from './domain-event';

export class UserCreatedEvent extends DomainEvent {
    constructor(public readonly userId: string) {
        super();
    }
}