import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class MediaDownloadedEvent extends DomainEvent {
    constructor(aggregateId: UniqueEntityId);
}
