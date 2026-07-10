import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class EntityTypeDeletedEvent extends DomainEvent {
    readonly entityTypeId: UniqueEntityId;
    constructor(entityTypeId: UniqueEntityId);
}
