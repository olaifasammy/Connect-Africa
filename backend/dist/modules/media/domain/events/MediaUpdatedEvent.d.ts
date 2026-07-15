import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class MediaUpdatedEvent extends DomainEvent {
    constructor(aggregateId: UniqueEntityId);
}
