import { Entity as BaseEntity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { EntityId } from '../value-objects/EntityId';
import { ExternalIdentifier } from '../value-objects/EntityValueObjects';
/**
 * EntityIdentifier Entity.
 * Represents an external system identifier for an Entity.
 */
interface EntityIdentifierProps {
    entityId: EntityId;
    identifier: ExternalIdentifier;
    createdAt: Date;
}
export declare class EntityIdentifier extends BaseEntity<EntityIdentifierProps> {
    constructor(props: EntityIdentifierProps, id?: UniqueEntityId);
    get entityId(): EntityId;
    get identifier(): ExternalIdentifier;
    get createdAt(): Date;
}
export {};
