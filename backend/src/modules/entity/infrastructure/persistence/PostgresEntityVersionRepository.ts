import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';

import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import { IEntityVersionRepository } from '@modules/entity/domain/repositories/IEntityVersionRepository';
import { EntityVersion } from '@modules/entity/domain/entities/EntityVersion';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { EntityMetadata } from '@modules/entity/domain/value-objects/EntityMetadata';

import {
  EntityStatus,
  VersionNumber,
} from '@modules/entity/domain/value-objects/EntityValueObjects';

interface EntityVersionRow {
  id: string;
  entity_id: string;
  version_number: number;
  name: string;
  type: string;
  status:
    | 'DRAFT'
    | 'PUBLISHED'
    | 'ARCHIVED';
  metadata: unknown;
  created_at: Date;
}

interface EntityVersionSnapshot {
  slug?: string;
  description?: string;
  source?: string;
  tags?: unknown;
  attributes?: unknown;
}

@provide(
  PostgresEntityVersionRepository,
  true,
)
@injectable()
export class PostgresEntityVersionRepository
  implements IEntityVersionRepository
{
  constructor(
    private readonly provider: PostgresProvider,
  ) {}

  async findById(
    id: string,
  ): Promise<EntityVersion | null> {
    const result =
      await this.provider.query<EntityVersionRow>(
        `
          SELECT
            id,
            entity_id,
            version_number,
            name,
            type,
            status,
            metadata,
            created_at
          FROM entity_versions
          WHERE id = $1
          LIMIT 1
        `,
        [id],
      );

    if (
      result.rows.length === 0
    ) {
      return null;
    }

    return this.mapRow(
      result.rows[0],
    );
  }

  async findByEntityIdAndVersionId(
    entityId: EntityId,
    versionId: string,
  ): Promise<EntityVersion | null> {
    const result =
      await this.provider.query<EntityVersionRow>(
        `
          SELECT
            id,
            entity_id,
            version_number,
            name,
            type,
            status,
            metadata,
            created_at
          FROM entity_versions
          WHERE entity_id = $1
            AND id = $2
          LIMIT 1
        `,
        [
          entityId.value,
          versionId,
        ],
      );

    if (
      result.rows.length === 0
    ) {
      return null;
    }

    return this.mapRow(
      result.rows[0],
    );
  }

  async getNextVersionNumber(
    entityId: EntityId,
  ): Promise<number> {
    const entityResult =
      await this.provider.query<{
        id: string;
      }>(
        `
          SELECT id
          FROM entities
          WHERE id = $1
          FOR UPDATE
        `,
        [entityId.value],
      );

    if (
      entityResult.rows.length === 0
    ) {
      throw new Error(
        `Entity with ID ${entityId.value} not found.`,
      );
    }

    const versionResult =
      await this.provider.query<{
        next_version:
          | string
          | number;
      }>(
        `
          SELECT
            COALESCE(
              MAX(version_number),
              0
            ) + 1 AS next_version
          FROM entity_versions
          WHERE entity_id = $1
        `,
        [entityId.value],
      );

    const nextVersion =
      Number(
        versionResult.rows[0]
          ?.next_version,
      );

    if (
      !Number.isInteger(
        nextVersion,
      ) ||
      nextVersion < 1
    ) {
      throw new Error(
        'Failed to allocate a valid Entity version number.',
      );
    }

    return nextVersion;
  }

  async save(
    version: EntityVersion,
  ): Promise<void> {
    await this.provider.query(
      `
        INSERT INTO entity_versions (
          id,
          entity_id,
          version_number,
          name,
          type,
          status,
          metadata,
          created_at
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8
        )
      `,
      [
        version.id.toString(),
        version.entityId.value,
        version.versionNumber.value,
        version.name,
        version.type,
        version.status.value,
        JSON.stringify({
          slug:
            version.metadata.slug,

          description:
            version.metadata.description,

          source:
            version.metadata.source,

          tags:
            version.metadata.tags,

          attributes:
            version.metadata.attributes,
        }),
        version.createdAt,
      ],
    );
  }

  private mapRow(
    row: EntityVersionRow,
  ): EntityVersion {
    const snapshot =
      this.parseSnapshot(
        row.metadata,
      );

    let attributes: Record<
      string,
      unknown
    > = {};

    if (
      snapshot.attributes !==
        undefined
    ) {
      if (
        typeof snapshot.attributes !==
          'object' ||
        snapshot.attributes ===
          null ||
        Array.isArray(
          snapshot.attributes,
        )
      ) {
        throw new Error(
          'Entity version attributes must be a JSON object.',
        );
      }

      attributes = {
        ...(
          snapshot.attributes as Record<
            string,
            unknown
          >
        ),
      };
    }

    return EntityVersion.create(
      {
        entityId:
          EntityId.create(
            row.entity_id,
          ),

        versionNumber:
          VersionNumber.create(
            row.version_number,
          ),

        name: row.name,

        type: row.type,

        metadata:
          EntityMetadata.create({
            slug:
              snapshot.slug,

            description:
              snapshot.description,

            source:
              snapshot.source,

            tags:
              Array.isArray(
                snapshot.tags,
              )
                ? snapshot.tags
                : [],

            attributes,
          }),

        status:
          EntityStatus.create(
            row.status,
          ),

        createdAt:
          new Date(
            row.created_at,
          ),
      },
      new UniqueEntityId(
        row.id,
      ),
    );
  }

  private parseSnapshot(
    metadata: unknown,
  ): EntityVersionSnapshot {
    if (
      metadata === null ||
      metadata === undefined
    ) {
      return {};
    }

    if (
      typeof metadata ===
      'string'
    ) {
      try {
        const parsed: unknown =
          JSON.parse(metadata);

        if (
          typeof parsed !==
            'object' ||
          parsed === null ||
          Array.isArray(parsed)
        ) {
          throw new Error(
            'Entity version metadata must be a JSON object.',
          );
        }

        return parsed as EntityVersionSnapshot;
      } catch {
        throw new Error(
          'Entity version metadata contains invalid JSON.',
        );
      }
    }

    if (
      typeof metadata !==
        'object' ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        'Entity version metadata must be a JSON object.',
      );
    }

    return metadata as EntityVersionSnapshot;
  }
}