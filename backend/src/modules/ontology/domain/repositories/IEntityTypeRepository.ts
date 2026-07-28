import { EntityType } from '../entities/EntityType';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface IEntityTypeRepository {
  findById(id: UniqueEntityId): Promise<EntityType | null>;
  findByName(name: string): Promise<EntityType | null>;
  save(entityType: EntityType): Promise<void>;
  delete(id: UniqueEntityId): Promise<void>;
}
