import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class ThumbnailGeneratedEvent extends DomainEvent {
    constructor(aggregateId: UniqueEntityId);
}
