import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { Entity } from '../entities/Entity';
export declare class EntityUpdatedEvent extends DomainEvent {
    readonly entity: Entity;
    constructor(entity: Entity);
}
