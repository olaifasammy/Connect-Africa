import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { SourceId } from '../value-objects/SourceValueObjects';
export declare class SourceDeletedEvent extends DomainEvent {
    readonly sourceId: SourceId;
    constructor(sourceId: SourceId);
}
