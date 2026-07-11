import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { SourceId } from '../value-objects/SourceValueObjects';
export declare class SourceCreatedEvent extends DomainEvent {
    readonly sourceId: SourceId;
    constructor(sourceId: SourceId);
}
