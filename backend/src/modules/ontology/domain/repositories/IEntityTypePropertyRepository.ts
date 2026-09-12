import { EntityTypeProperty } from '../entities/EntityTypeProperty';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface IEntityTypePropertyRepository {
  findById(
    id: UniqueEntityId,
  ): Promise<EntityTypeProperty | null>;

  findByEntityTypeId(
    entityTypeId: UniqueEntityId,
  ): Promise<EntityTypeProperty[]>;

  findByName(
    entityTypeId: UniqueEntityId,
    name: string,
  ): Promise<EntityTypeProperty | null>;

  save(
    property: EntityTypeProperty,
  ): Promise<void>;

  delete(
    id: UniqueEntityId,
  ): Promise<void>;
}