import { Entity } from '../entities/Entity';
import { EntityId } from '../value-objects/EntityId';

export interface IEntityRepository {
  save(entity: Entity): Promise<void>;
  findById(id: EntityId): Promise<Entity | null>;
  existsBySlug(slug: string): Promise<boolean>;
  findBySlug(slug: string): Promise<Entity | null>;
  findByIdentifier(identifier: string): Promise<Entity | null>;
  findAll(page: number, limit: number): Promise<Entity[]>;
  search(term: string): Promise<Entity[]>;
}
