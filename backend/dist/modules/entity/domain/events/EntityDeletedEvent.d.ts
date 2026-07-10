import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { EntityId } from '../value-objects/EntityId';
export declare class EntityDeletedEvent extends DomainEvent {
    readonly entityId: EntityId;
    constructor(entityId: EntityId);
}
