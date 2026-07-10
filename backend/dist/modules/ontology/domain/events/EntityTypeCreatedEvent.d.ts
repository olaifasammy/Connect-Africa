import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class EntityTypeCreatedEvent extends DomainEvent {
    readonly entityTypeId: UniqueEntityId;
    constructor(entityTypeId: UniqueEntityId);
}
