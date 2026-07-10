import { UniqueEntityId } from './UniqueEntityId';
export declare abstract class DomainEvent {
    readonly occurredOn: Date;
    readonly aggregateId: UniqueEntityId;
    constructor(aggregateId: UniqueEntityId);
}
