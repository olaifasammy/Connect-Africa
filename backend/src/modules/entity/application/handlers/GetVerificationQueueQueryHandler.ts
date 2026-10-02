import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetVerificationQueueQuery } from '../queries/GetVerificationQueueQuery';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { EntityResponse } from '../dto/EntityResponse';
import { PaginatedResult } from '@shared/application/pagination/PaginationTypes';
import { CursorCodec } from '@shared/application/pagination/CursorCodec';

interface EntityRow {
  id: string;
  name: string;
  type: string;
  slug: string;
  description: string | null;
  source: string | null;
  tags: string[] | null;
  status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'PUBLISHED' | 'ARCHIVED';
  created_at: Date;
  updated_at: Date;
}

@provide(GetVerificationQueueQueryHandler, true)
@injectable()
export class GetVerificationQueueQueryHandler
  implements IQueryHandler<GetVerificationQueueQuery, PaginatedResult<EntityResponse>>
{
  constructor(
    @inject(PostgresProvider)
    private readonly postgresProvider: PostgresProvider,
    @inject(CursorCodec)
    private readonly cursorCodec: CursorCodec,
  ) {}

  async handle(
    query: GetVerificationQueueQuery,
  ): Promise<PaginatedResult<EntityResponse>> {
    const { pagination } = query;
    const limit = pagination.limit || 20;

    let rows: EntityRow[] = [];
    let hasNext = false;
    let total = 0;

    // Count total pending
    const countResult = await this.postgresProvider.query<{ count: string }>(
      `SELECT COUNT(*) as count FROM entities WHERE verification_status = 'UNVERIFIED' OR status = 'PENDING_REVIEW'`
    );
    total = parseInt(countResult.rows[0]?.count || '0', 10);

    if (pagination.strategy === 'cursor') {
      let createdAtValue: string | undefined;
      let idValue: string | undefined;

      if (pagination.cursor) {
        try {
          const decoded = this.cursorCodec.decode(pagination.cursor);
          const position = decoded.position as { createdAt: string; id: string };
          createdAtValue = position.createdAt;
          idValue = position.id;
        } catch {
          // Fallback if invalid cursor
        }
      }

      let queryStr = `
        SELECT id, name, type, slug, description, source, tags, status, created_at, updated_at
        FROM entities
        WHERE (verification_status = 'UNVERIFIED' OR status = 'PENDING_REVIEW')
      `;
      const params: any[] = [];

      if (createdAtValue && idValue) {
        queryStr += ` AND (created_at < $1 OR (created_at = $1 AND id > $2))`;
        params.push(createdAtValue, idValue);
      }

      queryStr += ` ORDER BY created_at DESC, id ASC LIMIT $${params.length + 1}`;
      params.push(limit + 1);

      const result = await this.postgresProvider.query<EntityRow>(queryStr, params);
      rows = result.rows;
      hasNext = rows.length > limit;
      if (hasNext) {
        rows.pop();
      }
    } else {
      const page = pagination.page || 1;
      const offset = (page - 1) * limit;

      const result = await this.postgresProvider.query<EntityRow>(
        `
          SELECT id, name, type, slug, description, source, tags, status, created_at, updated_at
          FROM entities
          WHERE verification_status = 'UNVERIFIED' OR status = 'PENDING_REVIEW'
          ORDER BY created_at DESC, id ASC
          LIMIT $1 OFFSET $2
        `,
        [limit + 1, offset]
      );

      rows = result.rows;
      hasNext = rows.length > limit;
      if (hasNext) {
        rows.pop();
      }
    }

    const items: EntityResponse[] = rows.map((row) => ({
      id: row.id,
      name: row.name,
      type: row.type,
      slug: row.slug,
      description: row.description ?? undefined,
      source: row.source ?? undefined,
      tags: Array.isArray(row.tags) ? row.tags : [],
      status: row.status,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }));

    let nextCursor: string | undefined;
    if (hasNext && rows.length > 0 && pagination.strategy === 'cursor') {
      const lastRow = rows[rows.length - 1];
      nextCursor = this.cursorCodec.encode({
        version: 1,
        scope: 'entity.verification-queue',
        sort: 'created_at_desc_id_asc',
        position: {
          createdAt: new Date(lastRow.created_at).toISOString(),
          id: lastRow.id,
        },
      });
    }

    if (pagination.strategy === 'cursor') {
      return {
        items,
        pagination: {
          strategy: 'cursor',
          limit,
          hasNext,
          hasPrevious: Boolean(pagination.cursor),
          ...(nextCursor ? { nextCursor } : {}),
        },
      };
    } else {
      const page = pagination.page || 1;
      const totalPages = Math.ceil(total / limit);
      return {
        items,
        pagination: {
          strategy: 'offset',
          page,
          limit,
          total,
          totalPages,
          hasNext,
          hasPrevious: page > 1,
        },
      };
    }
  }
}
