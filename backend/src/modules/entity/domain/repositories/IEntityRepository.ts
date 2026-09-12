import { Entity } from '../entities/Entity';
import { EntityId } from '../value-objects/EntityId';

import {
  PaginationRequest,
  PaginatedResult,
} from '@shared/application/pagination/PaginationTypes';

export interface IEntityRepository {
  save(entity: Entity): Promise<void>;

  findById(
    id: EntityId,
  ): Promise<Entity | null>;

  existsBySlug(
    slug: string,
    excludeEntityId?: EntityId,
  ): Promise<boolean>;

  findBySlug(
    slug: string,
  ): Promise<Entity | null>;

  findByIdentifier(
    identifier: string,
  ): Promise<Entity | null>;

  findAll(
    pagination: PaginationRequest,
  ): Promise<PaginatedResult<Entity>>;

  search(
    term: string,
  ): Promise<Entity[]>;

  delete(
    id: EntityId,
  ): Promise<void>;
}