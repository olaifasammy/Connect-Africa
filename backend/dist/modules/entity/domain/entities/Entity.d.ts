import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { EntityId } from '../value-objects/EntityId';
import { EntityName } from '../value-objects/EntityName';
import { EntityMetadata } from '../value-objects/EntityMetadata';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
/**
 * Entity Aggregate Root Props.
 */
interface EntityProps {
    name: EntityName;
    type: string;
    metadata: EntityMetadata;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Entity Aggregate Root.
 * Manages the lifecycle and metadata of a core platform entity.
 */
export declare class Entity extends AggregateRoot<EntityProps> {
    private constructor();
    /**
     * Validates business invariants.
     */
    private validateInvariants;
    /**
     * Factory method to create a new Entity.
     */
    static create(id: EntityId, name: EntityName, type: string, metadata: EntityMetadata): Entity;
    /**
     * Rehydrates an existing Entity from persistence.
     */
    static rehydrate(id: UniqueEntityId, name: EntityName, type: string, metadata: EntityMetadata, createdAt: Date, updatedAt: Date): Entity;
    get entityId(): EntityId;
    get name(): EntityName;
    get type(): string;
    get metadata(): EntityMetadata;
    /**
     * Merges another entity into this one.
     */
    merge(otherEntity: Entity): void;
}
export {};
