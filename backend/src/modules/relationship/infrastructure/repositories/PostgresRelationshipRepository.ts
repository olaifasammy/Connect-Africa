import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import {
  IRelationshipRepository,
} from '../../domain/repositories/IRelationshipRepository';

import {
  Relationship,
} from '../../domain/entities/Relationship';

import {
  RelationshipId,
  EntityId,
  RelationshipTypeId,
} from '../../domain/value-objects/RelationshipValueObjects';

import {
  PostgresProvider,
} from '@shared/infrastructure/database/PostgresProvider';

import {
  RelationshipConflictError,
  RelationshipNotFoundError,
  RelationshipValidationError,
} from '../../domain/errors/RelationshipErrors';

@provide('IRelationshipRepository', true)
@injectable()
export class PostgresRelationshipRepository
  implements IRelationshipRepository
{
  constructor(
    private readonly provider:
      PostgresProvider,
  ) {}

  async save(
    relationship: Relationship,
  ): Promise<void> {
    try {
      await this.provider.query(
        `
          INSERT INTO relationships (
            id,
            source_id,
            target_id,
            type_id,
            created_at
          )
          VALUES ($1, $2, $3, $4, $5)
        `,
        [
          relationship.id.toString(),
          relationship.sourceEntityId.value,
          relationship.targetEntityId.value,
          relationship.relationshipTypeId.value,
          relationship.createdAt,
        ],
      );
    } catch (error: any) {
      if (error?.code === '23505') {
        throw new RelationshipConflictError(
          'Relationship already exists for the same source entity, target entity, and relationship type.',
        );
      }

      throw error;
    }
  }

  async findById(
    id: RelationshipId,
  ): Promise<Relationship | null> {
    const result =
      await this.provider.query(
        `
          SELECT
            id,
            source_id,
            target_id,
            type_id,
            created_at
          FROM relationships
          WHERE id = $1
        `,
        [id.toString()],
      );

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return Relationship.reconstruct(
      new RelationshipId(row.id),
      new EntityId(row.source_id),
      new EntityId(row.target_id),
      new RelationshipTypeId(row.type_id),
      new Date(row.created_at),
    );
  }

  async exists(
    relationship: Relationship,
  ): Promise<boolean> {
    const result =
      await this.provider.query(
        `
          SELECT 1
          FROM relationships
          WHERE source_id = $1
            AND target_id = $2
            AND type_id = $3
          LIMIT 1
        `,
        [
          relationship.sourceEntityId.value,
          relationship.targetEntityId.value,
          relationship.relationshipTypeId.value,
        ],
      );

    return result.rows.length > 0;
  }

  async update(
    relationship: Relationship,
  ): Promise<void> {
    try {
      const result =
        await this.provider.query(
          `
            UPDATE relationships
            SET
              source_id = $1,
              target_id = $2,
              type_id = $3
            WHERE id = $4
          `,
          [
            relationship.sourceEntityId.value,
            relationship.targetEntityId.value,
            relationship.relationshipTypeId.value,
            relationship.id.toString(),
          ],
        );

      if (result.rowCount !== 1) {
        throw new RelationshipNotFoundError(
          `Relationship with ID ${relationship.id.toString()} not found.`,
        );
      }
    } catch (error: any) {
      if (
        error instanceof RelationshipNotFoundError
      ) {
        throw error;
      }

      if (error?.code === '23505') {
        throw new RelationshipConflictError(
          'Relationship already exists for the same source entity, target entity, and relationship type.',
        );
      }

      throw error;
    }
  }

  async delete(
    id: RelationshipId,
  ): Promise<void> {
    const result =
      await this.provider.query(
        `
          DELETE FROM relationships
          WHERE id = $1
        `,
        [id.toString()],
      );

    if (result.rowCount !== 1) {
      throw new RelationshipNotFoundError(
        `Relationship with ID ${id.toString()} not found.`,
      );
    }
  }

  async list(
    limit: number,
    offset: number,
  ): Promise<Relationship[]> {
    if (
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      throw new RelationshipValidationError(
        'Relationship list limit must be between 1 and 100.',
      );
    }

    if (
      !Number.isInteger(offset) ||
      offset < 0
    ) {
      throw new RelationshipValidationError(
        'Relationship list offset must be zero or greater.',
      );
    }

    const result =
      await this.provider.query(
        `
          SELECT
            id,
            source_id,
            target_id,
            type_id,
            created_at
          FROM relationships
          ORDER BY created_at DESC, id ASC
          LIMIT $1
          OFFSET $2
        `,
        [
          limit,
          offset,
        ],
      );

    return result.rows.map(
      (row: any) =>
        Relationship.reconstruct(
          new RelationshipId(row.id),
          new EntityId(row.source_id),
          new EntityId(row.target_id),
          new RelationshipTypeId(row.type_id),
          new Date(row.created_at),
        ),
    );
  }
}