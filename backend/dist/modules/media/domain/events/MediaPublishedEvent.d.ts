import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class MediaPublishedEvent extends DomainEvent {
    constructor(aggregateId: UniqueEntityId);
}
