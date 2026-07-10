import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { Entity } from '../entities/Entity';
export declare class EntityPublishedEvent extends DomainEvent {
    readonly entity: Entity;
    constructor(entity: Entity);
}
