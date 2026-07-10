import { Entity as BaseEntity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { EntityId } from '../value-objects/EntityId';
import { EntityMetadata } from '../value-objects/EntityMetadata';
import { VersionNumber } from '../value-objects/EntityValueObjects';
/**
 * EntityVersion Entity.
 * Represents a historical snapshot of an Entity aggregate.
 */
interface EntityVersionProps {
    entityId: EntityId;
    versionNumber: VersionNumber;
    metadata: EntityMetadata;
    createdAt: Date;
}
export declare class EntityVersion extends BaseEntity<EntityVersionProps> {
    private constructor();
    static create(props: EntityVersionProps, id?: UniqueEntityId): EntityVersion;
    get entityId(): EntityId;
    get versionNumber(): VersionNumber;
    get metadata(): EntityMetadata;
    get createdAt(): Date;
}
export {};
