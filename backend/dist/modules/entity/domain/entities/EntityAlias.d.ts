import { Entity as BaseEntity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { EntityId } from '../value-objects/EntityId';
import { AliasName } from '../value-objects/EntityValueObjects';
/**
 * EntityAlias Entity.
 * Represents an alternative name for an Entity.
 */
interface EntityAliasProps {
    entityId: EntityId;
    name: AliasName;
    createdAt: Date;
}
export declare class EntityAlias extends BaseEntity<EntityAliasProps> {
    constructor(props: EntityAliasProps, id?: UniqueEntityId);
    get entityId(): EntityId;
    get name(): AliasName;
    get createdAt(): Date;
}
export {};
