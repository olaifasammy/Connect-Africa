import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { EntityId } from '../value-objects/EntityId';
export declare class EntityMergedEvent extends DomainEvent {
    readonly sourceEntityId: EntityId;
    readonly targetEntityId: EntityId;
    constructor(sourceEntityId: EntityId, targetEntityId: EntityId);
}
