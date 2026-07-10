import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { EntityId } from '../value-objects/EntityId';
export declare class EntityAliasRemovedEvent extends DomainEvent {
    readonly entityId: EntityId;
    readonly alias: string;
    constructor(entityId: EntityId, alias: string);
}
