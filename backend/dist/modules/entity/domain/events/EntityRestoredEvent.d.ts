import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { Entity } from '../entities/Entity';
export declare class EntityRestoredEvent extends DomainEvent {
    readonly entity: Entity;
    constructor(entity: Entity);
}
