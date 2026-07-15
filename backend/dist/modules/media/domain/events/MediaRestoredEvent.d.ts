import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class MediaRestoredEvent extends DomainEvent {
    constructor(aggregateId: UniqueEntityId);
}
