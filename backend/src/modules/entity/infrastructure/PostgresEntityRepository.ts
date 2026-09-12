import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { CursorCodec } from '@shared/application/pagination/CursorCodec';

import {
  PaginationRequest,
  PaginatedResult,
} from '@shared/application/pagination/PaginationTypes';

import { Entity } from '../domain/entities/Entity';
import { EntityId } from '../domain/value-objects/EntityId';
import { EntityName } from '../domain/value-objects/EntityName';
import { EntityMetadata } from '../domain/value-objects/EntityMetadata';
import { EntityTypeId } from '../domain/value-objects/EntityValueObjects';
import { IEntityRepository } from '../domain/repositories/IEntityRepository';

interface EntityRow {
  id: string;
  name: string;
  type: string;
  slug: string | null;
  description: string | null;
  source: string | null;
  tags: string[] | null;
  attributes: unknown;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  created_at: Date;
  updated_at: Date;
}

const ENTITY_LIST_SCOPE =
  'entity.list';

const ENTITY_LIST_SORT =
  'created_at_desc_id_asc';

@provide(
  PostgresEntityRepository,
  true,
)
@injectable()
export class PostgresEntityRepository
  implements IEntityRepository
{
  constructor(
    private readonly postgresProvider: PostgresProvider,
    private readonly cursorCodec: CursorCodec,
  ) {}

  async save(
    entity: Entity,
  ): Promise<void> {
    const slug =
      entity.metadata.slug;

    if (!slug) {
      throw new Error(
        'Entity persistence failed: entity slug is required before saving.',
      );
    }

    await this.postgresProvider.query(
      `
        INSERT INTO entities (
          id,
          name,
          type,
          slug,
          description,
          source,
          tags,
          attributes,
          status,
          created_at,
          updated_at
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11
        )
        ON CONFLICT (id)
        DO UPDATE SET
          name = EXCLUDED.name,
          type = EXCLUDED.type,
          slug = EXCLUDED.slug,
          description = EXCLUDED.description,
          source = EXCLUDED.source,
          tags = EXCLUDED.tags,
          attributes = EXCLUDED.attributes,
          status = EXCLUDED.status,
          updated_at = EXCLUDED.updated_at
      `,
      [
        entity.entityId.value,
        entity.name.value,
        entity.type,
        slug,
        entity.metadata.description ??
          null,
        entity.metadata.source ??
          null,
        entity.metadata.tags,
        JSON.stringify(
          entity.metadata.attributes,
        ),
        entity.status,
        entity.createdAt,
        entity.updatedAt,
      ],
    );
  }

  async findById(
    id: EntityId,
  ): Promise<Entity | null> {
    const result =
      await this.postgresProvider.query<EntityRow>(
        `
          SELECT
            id,
            name,
            type,
            slug,
            description,
            source,
            tags,
            attributes,
            status,
            created_at,
            updated_at
          FROM entities
          WHERE id = $1
          LIMIT 1
        `,
        [id.value],
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

  async existsBySlug(
    slug: string,
    excludeEntityId?: EntityId,
  ): Promise<boolean> {
    const normalizedSlug =
      slug.trim();

    if (!normalizedSlug) {
      return false;
    }

    const result =
      await this.postgresProvider.query<{
        exists: boolean;
      }>(
        `
          SELECT EXISTS (
            SELECT 1
            FROM entities
            WHERE slug = $1
              AND (
                $2::text IS NULL
                OR id <> $2
              )
          ) AS exists
        `,
        [
          normalizedSlug,
          excludeEntityId?.value ??
            null,
        ],
      );

    return (
      result.rows[0]?.exists ??
      false
    );
  }

  async findBySlug(
    slug: string,
  ): Promise<Entity | null> {
    const normalizedSlug =
      slug.trim();

    if (!normalizedSlug) {
      return null;
    }

    const result =
      await this.postgresProvider.query<EntityRow>(
        `
          SELECT
            id,
            name,
            type,
            slug,
            description,
            source,
            tags,
            attributes,
            status,
            created_at,
            updated_at
          FROM entities
          WHERE slug = $1
          LIMIT 1
        `,
        [normalizedSlug],
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

  async findByIdentifier(
    identifier: string,
  ): Promise<Entity | null> {
    const normalizedIdentifier =
      identifier.trim();

    if (!normalizedIdentifier) {
      return null;
    }

    const result =
      await this.postgresProvider.query<EntityRow>(
        `
          SELECT
            e.id,
            e.name,
            e.type,
            e.slug,
            e.description,
            e.source,
            e.tags,
            e.attributes,
            e.status,
            e.created_at,
            e.updated_at
          FROM entities e
          INNER JOIN entity_identifiers ei
            ON ei.entity_id = e.id
          WHERE ei.external_id = $1
          LIMIT 1
        `,
        [normalizedIdentifier],
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

  async findAll(
    pagination: PaginationRequest,
  ): Promise<PaginatedResult<Entity>> {
    if (
      pagination.strategy ===
      'cursor'
    ) {
      return this.findAllByCursor(
        pagination,
      );
    }

    return this.findAllByOffset(
      pagination,
    );
  }

  private async findAllByOffset(
    pagination: Extract<
      PaginationRequest,
      { strategy: 'offset' }
    >,
  ): Promise<PaginatedResult<Entity>> {
    const page =
      Number.isFinite(
        pagination.page,
      )
        ? Math.max(
            1,
            Math.floor(
              pagination.page,
            ),
          )
        : 1;

    const limit =
      Number.isFinite(
        pagination.limit,
      )
        ? Math.min(
            100,
            Math.max(
              1,
              Math.floor(
                pagination.limit,
              ),
            ),
          )
        : 20;

    const offset =
      (page - 1) * limit;

    const countResult =
      await this.postgresProvider.query<{
        total: string;
      }>(
        `
          SELECT COUNT(*)::text AS total
          FROM entities
        `,
      );

    const total = Number(
      countResult.rows[0]?.total ??
        0,
    );

    const result =
      await this.postgresProvider.query<EntityRow>(
        `
          SELECT
            id,
            name,
            type,
            slug,
            description,
            source,
            tags,
            attributes,
            status,
            created_at,
            updated_at
          FROM entities
          ORDER BY created_at DESC, id ASC
          LIMIT $1
          OFFSET $2
        `,
        [limit, offset],
      );

    const totalPages =
      total === 0
        ? 0
        : Math.ceil(
            total / limit,
          );

    return {
      items: result.rows.map(
        (row) =>
          this.mapRow(row),
      ),
      pagination: {
        strategy: 'offset',
        page,
        limit,
        total,
        totalPages,
        hasNext:
          page < totalPages,
        hasPrevious:
          page > 1,
      },
    };
  }

  private async findAllByCursor(
    pagination: Extract<
      PaginationRequest,
      { strategy: 'cursor' }
    >,
  ): Promise<PaginatedResult<Entity>> {
    const limit =
      Number.isFinite(
        pagination.limit,
      )
        ? Math.min(
            100,
            Math.max(
              1,
              Math.floor(
                pagination.limit,
              ),
            ),
          )
        : 20;

    let cursorCreatedAt:
      Date | undefined;

    let cursorId:
      string | undefined;

    if (pagination.cursor) {
      const payload =
        this.cursorCodec.decode(
          pagination.cursor,
        );

      if (
        payload.scope !==
          ENTITY_LIST_SCOPE ||
        payload.sort !==
          ENTITY_LIST_SORT
      ) {
        throw new Error(
          'Cursor does not belong to the Entity list.',
        );
      }

      const createdAt =
        payload.position
          .createdAt;

      const id =
        payload.position.id;

      if (
        typeof createdAt !==
          'string' ||
        typeof id !== 'string' ||
        !createdAt ||
        !id
      ) {
        throw new Error(
          'Entity cursor position is invalid.',
        );
      }

      const parsedCreatedAt =
        new Date(createdAt);

      if (
        Number.isNaN(
          parsedCreatedAt.getTime(),
        )
      ) {
        throw new Error(
          'Entity cursor timestamp is invalid.',
        );
      }

      cursorCreatedAt =
        parsedCreatedAt;

      cursorId = id;
    }

    const result =
      await this.postgresProvider.query<EntityRow>(
        cursorCreatedAt &&
        cursorId
          ? `
              SELECT
                id,
                name,
                type,
                slug,
                description,
                source,
                tags,
                attributes,
                status,
                created_at,
                updated_at
              FROM entities
              WHERE
                created_at < $1
                OR (
                  created_at = $1
                  AND id > $2
                )
              ORDER BY created_at DESC, id ASC
              LIMIT $3
            `
          : `
              SELECT
                id,
                name,
                type,
                slug,
                description,
                source,
                tags,
                attributes,
                status,
                created_at,
                updated_at
              FROM entities
              ORDER BY created_at DESC, id ASC
              LIMIT $1
            `,
        cursorCreatedAt &&
        cursorId
          ? [
              cursorCreatedAt,
              cursorId,
              limit + 1,
            ]
          : [limit + 1],
      );

    const hasNext =
      result.rows.length >
      limit;

    const rows = hasNext
      ? result.rows.slice(
          0,
          limit,
        )
      : result.rows;

    const items =
      rows.map((row) =>
        this.mapRow(row),
      );

    let nextCursor:
      string | undefined;

    if (
      hasNext &&
      rows.length > 0
    ) {
      const lastRow =
        rows[
          rows.length - 1
        ];

      nextCursor =
        this.cursorCodec.encode({
          version: 1,
          scope:
            ENTITY_LIST_SCOPE,
          sort:
            ENTITY_LIST_SORT,
          position: {
            createdAt:
              new Date(
                lastRow.created_at,
              ).toISOString(),
            id: lastRow.id,
          },
        });
    }

    return {
      items,
      pagination: {
        strategy: 'cursor',
        limit,
        ...(nextCursor
          ? { nextCursor }
          : {}),
        hasNext,
        hasPrevious:
          Boolean(
            pagination.cursor,
          ),
      },
    };
  }

  async search(
    term: string,
  ): Promise<Entity[]> {
    const normalizedTerm =
      term.trim();

    if (!normalizedTerm) {
      return [];
    }

    const searchTerm =
      `%${normalizedTerm}%`;

    const result =
      await this.postgresProvider.query<EntityRow>(
        `
          SELECT
            id,
            name,
            type,
            slug,
            description,
            source,
            tags,
            attributes,
            status,
            created_at,
            updated_at
          FROM entities
          WHERE
            name ILIKE $1
            OR slug ILIKE $1
            OR description ILIKE $1
          ORDER BY
            CASE
              WHEN name ILIKE $1 THEN 0
              WHEN slug ILIKE $1 THEN 1
              WHEN description ILIKE $1 THEN 2
              ELSE 3
            END,
            name ASC,
            id ASC
          LIMIT 100
        `,
        [searchTerm],
      );

    return result.rows.map(
      (row) =>
        this.mapRow(row),
    );
  }

  async delete(
    id: EntityId,
  ): Promise<void> {
    await this.postgresProvider.query(
      `
        DELETE FROM entities
        WHERE id = $1
      `,
      [id.value],
    );
  }

  private mapRow(
    row: EntityRow,
  ): Entity {
    if (!row.slug) {
      throw new Error(
        `Entity persistence error: entity "${row.id}" has no slug.`,
      );
    }

    let attributes: Record<
      string,
      unknown
    > = {};

    if (
      row.attributes !== null &&
      row.attributes !== undefined
    ) {
      if (
        typeof row.attributes ===
          'object' &&
        !Array.isArray(
          row.attributes,
        )
      ) {
        attributes = {
          ...(
            row.attributes as Record<
              string,
              unknown
            >
          ),
        };
      } else {
        throw new Error(
          `Entity persistence error: entity "${row.id}" has invalid attributes JSON.`,
        );
      }
    }

    const metadata =
      EntityMetadata.create({
        slug: row.slug,
        description:
          row.description ??
          undefined,
        source:
          row.source ??
          undefined,
        tags: Array.isArray(
          row.tags,
        )
          ? row.tags
          : [],
        attributes,
      });

    return Entity.rehydrate(
      new UniqueEntityId(
        row.id,
      ),
      EntityName.create(
        row.name,
      ),
      EntityTypeId.create(
        row.type,
      ),
      metadata,
      row.status,
      new Date(
        row.created_at,
      ),
      new Date(
        row.updated_at,
      ),
    );
  }
}