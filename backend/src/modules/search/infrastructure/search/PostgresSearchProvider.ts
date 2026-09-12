import {
  injectable,
} from 'inversify';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  PostgresProvider,
} from '@shared/infrastructure/database/PostgresProvider';

import {
  SearchProvider,
  SearchResult,
  SearchResultItem,
} from './SearchProvider';

import {
  SearchDocument,
  SearchResourceType,
} from '../../domain/models/SearchDocument';

import {
  SearchFilters,
  SearchSort,
  SearchSortOrder,
} from '../../domain/repositories/ISearchRepository';

@injectable()
export class PostgresSearchProvider
  extends SearchProvider
{
  private readonly tableName =
    'search_documents';

  constructor(
    private readonly provider:
      PostgresProvider,
  ) {
    super();
  }

  async createIndex(
    _name: string,
  ): Promise<void> {
    await this.provider.query(`
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id TEXT PRIMARY KEY,
        resource_id TEXT NOT NULL,
        resource_type TEXT NOT NULL,
        content JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(resource_type, resource_id)
      )
    `);

    await this.provider.query(`
      CREATE INDEX IF NOT EXISTS
        idx_search_documents_resource
      ON ${this.tableName}(resource_type, resource_id)
    `);

    await this.provider.query(`
      CREATE INDEX IF NOT EXISTS
        idx_search_documents_content_gin
      ON ${this.tableName}
      USING GIN(content)
    `);

    await this.provider.query(`
      CREATE INDEX IF NOT EXISTS
        idx_search_documents_content_fts
      ON ${this.tableName}
      USING GIN(
        to_tsvector(
          'english',
          COALESCE(content->>'title', '') ||
          ' ' ||
          COALESCE(content->>'snippet', '')
        )
      )
    `);
  }

  async deleteIndex(
    _name: string,
  ): Promise<void> {
    await this.provider.query(`
      DROP TABLE IF EXISTS
        ${this.tableName}
    `);
  }

  async rebuildIndex(
    _name: string,
  ): Promise<void> {
    await this.provider.query(`
      TRUNCATE TABLE
        ${this.tableName}
    `);
  }

  async findById(
    id: string,
  ): Promise<SearchDocument | null> {
    const result =
      await this.provider.query(
        `
          SELECT
            id,
            resource_id,
            resource_type,
            content,
            created_at
          FROM ${this.tableName}
          WHERE id = $1
        `,
        [id],
      );

    if (
      result.rows.length === 0
    ) {
      return null;
    }

    return this.toDocument(
      result.rows[0],
    );
  }

  async index(
    document: SearchDocument,
  ): Promise<void> {
    await this.provider.query(
      `
        INSERT INTO ${this.tableName} (
          id,
          resource_id,
          resource_type,
          content,
          created_at,
          updated_at
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          NOW()
        )
        ON CONFLICT (
          resource_type,
          resource_id
        )
        DO UPDATE SET
          id = EXCLUDED.id,
          content = EXCLUDED.content,
          updated_at = NOW()
      `,
      [
        document.id.toString(),
        document.resourceId.toString(),
        document.resourceType,
        JSON.stringify(
          document.content,
        ),
        document.createdAt,
      ],
    );
  }

  async update(
    document: SearchDocument,
  ): Promise<void> {
    await this.index(document);
  }

  async autocomplete(
    query: string,
  ): Promise<string[]> {
    const result =
      await this.provider.query(
        `
          SELECT DISTINCT
            content->>'title' AS title
          FROM ${this.tableName}
          WHERE content->>'title'
            ILIKE $1
          ORDER BY title ASC
          LIMIT 20
        `,
        [`${query}%`],
      );

    return result.rows
      .map(
        (row: {
          title: string | null;
        }) => row.title,
      )
      .filter(
        (
          title,
        ): title is string =>
          Boolean(title),
      );
  }

  async getSuggestions(
    query: string,
  ): Promise<string[]> {
    const result =
      await this.provider.query(
        `
          SELECT DISTINCT
            content->>'title' AS title
          FROM ${this.tableName}
          WHERE content->>'title'
            ILIKE $1
          ORDER BY title ASC
          LIMIT 20
        `,
        [`%${query}%`],
      );

    return result.rows
      .map(
        (row: {
          title: string | null;
        }) => row.title,
      )
      .filter(
        (
          title,
        ): title is string =>
          Boolean(title),
      );
  }

  async getTrending(): Promise<string[]> {
    const result =
      await this.provider.query(
        `
          SELECT
            content->>'title' AS title
          FROM ${this.tableName}
          WHERE content->>'title'
            IS NOT NULL
          ORDER BY
            COALESCE(
              (content->>'popularity')::numeric,
              0
            ) DESC
          LIMIT 20
        `,
      );

    return result.rows
      .map(
        (row: {
          title: string | null;
        }) => row.title,
      )
      .filter(
        (
          title,
        ): title is string =>
          Boolean(title),
      );
  }

  async search(
    query: string,
    filters?: SearchFilters,
    sortBy: SearchSort = 'relevance',
    sortOrder: SearchSortOrder = 'desc',
    limit: number = 20,
    cursor?: string,
    includeFacets?: readonly string[],
  ): Promise<SearchResult> {
    const safeLimit =
      Math.min(
        Math.max(
          Math.trunc(limit),
          1,
        ),
        100,
      );

    const conditions: string[] = [];
    const params: unknown[] = [];

    const addParam = (
      value: unknown,
    ): string => {
      params.push(value);
      return `$${params.length}`;
    };

    const searchParam =
      addParam(query);

    const ilikeParam =
      addParam(`%${query}%`);

    conditions.push(`
      (
        to_tsvector(
          'english',
          COALESCE(
            content->>'title',
            ''
          ) ||
          ' ' ||
          COALESCE(
            content->>'snippet',
            ''
          )
        ) @@ plainto_tsquery(
          'english',
          ${searchParam}
        )
        OR content::text ILIKE
          ${ilikeParam}
      )
    `);

    if (
      filters?.resourceType
    ) {
      conditions.push(
        `resource_type = ${addParam(
          filters.resourceType,
        )}`,
      );
    }

    if (filters?.ontology) {
      conditions.push(`
        content @>
        ${addParam(
          JSON.stringify({
            ontology:
              filters.ontology,
          }),
        )}::jsonb
      `);
    }

    if (
      filters?.relationshipType
    ) {
      conditions.push(`
        content @>
        ${addParam(
          JSON.stringify({
            relationshipType:
              filters.relationshipType,
          }),
        )}::jsonb
      `);
    }

    if (filters?.category) {
      conditions.push(`
        content @>
        ${addParam(
          JSON.stringify({
            category:
              filters.category,
          }),
        )}::jsonb
      `);
    }

    if (
      filters?.language
    ) {
      conditions.push(`
        content->>'language' =
        ${addParam(
          filters.language,
        )}
      `);
    }

    if (filters?.author) {
      conditions.push(`
        content->>'authorId' =
        ${addParam(
          filters.author,
        )}
      `);
    }

    if (filters?.status) {
      conditions.push(`
        content->>'status' =
        ${addParam(
          filters.status,
        )}
      `);
    }

    if (
      filters?.tags &&
      filters.tags.length > 0
    ) {
      conditions.push(`
        content->'tags' @>
        ${addParam(
          JSON.stringify(
            filters.tags,
          ),
        )}::jsonb
      `);
    }

    if (
      filters?.dateRange?.start
    ) {
      conditions.push(`
        created_at >=
        ${addParam(
          filters.dateRange.start,
        )}::timestamptz
      `);
    }

    if (
      filters?.dateRange?.end
    ) {
      conditions.push(`
        created_at <=
        ${addParam(
          filters.dateRange.end,
        )}::timestamptz
      `);
    }

    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(
            ' AND ',
          )}`
        : '';

    let orderBy: string;

    switch (sortBy) {
      case 'alphabetical':
        orderBy =
          `content->>'title'`;
        break;

      case 'dateCreated':
        orderBy =
          'created_at';
        break;

      case 'dateUpdated':
        orderBy =
          'updated_at';
        break;

      case 'popularity':
        orderBy = `
          COALESCE(
            (content->>'popularity')::numeric,
            0
          )
        `;
        break;

      case 'relevance':
      default:
        orderBy = `
          ts_rank_cd(
            to_tsvector(
              'english',
              COALESCE(
                content->>'title',
                ''
              ) ||
              ' ' ||
              COALESCE(
                content->>'snippet',
                ''
              )
            ),
            plainto_tsquery(
              'english',
              ${searchParam}
            )
          )
        `;
        break;
    }

    const direction =
      sortOrder === 'asc'
        ? 'ASC'
        : 'DESC';

    /*
     * Cursor is the last returned document ID.
     * ID is used as the deterministic tie-breaker.
     */
    if (cursor) {
      conditions.push(
        `id > ${addParam(
          cursor,
        )}`,
      );
    }

    const finalWhereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(
            ' AND ',
          )}`
        : '';

    const countResult =
      await this.provider.query(
        `
          SELECT COUNT(*)::int AS total
          FROM ${this.tableName}
          ${finalWhereClause}
        `,
        params,
      );

    const total =
      Number(
        countResult.rows[0]
          ?.total ?? 0,
      );

    const dataParams =
      [...params];

    dataParams.push(
      safeLimit + 1,
    );

    const limitParam =
      `$${dataParams.length}`;

    const result =
      await this.provider.query(
        `
          SELECT
            id,
            resource_id,
            resource_type,
            content,
            created_at,
            ${orderBy} AS search_score
          FROM ${this.tableName}
          ${finalWhereClause}
          ORDER BY
            ${orderBy}
            ${direction},
            id ASC
          LIMIT ${limitParam}
        `,
        dataParams,
      );

    const hasNextPage =
      result.rows.length >
      safeLimit;

    const rows =
      hasNextPage
        ? result.rows.slice(
            0,
            safeLimit,
          )
        : result.rows;

    const documents:
      SearchResultItem[] =
      rows.map(
        (row: any) => ({
          document:
            this.toDocument(row),
          score:
            Number(
              row.search_score ?? 0,
            ),
        }),
      );

    const nextCursor =
      hasNextPage &&
      rows.length > 0
        ? rows[
            rows.length - 1
          ].id
        : undefined;

    let facets:
      Record<
        string,
        Record<string, number>
      > | undefined;

    if (
      includeFacets &&
      includeFacets.length > 0
    ) {
      facets =
        await this.buildFacets(
          finalWhereClause,
          params,
          includeFacets,
        );
    }

    return {
      documents,
      facets,
      total,
      nextCursor,
    };
  }

    async bulkIndex(
    documents: readonly SearchDocument[],
  ): Promise<void> {
    await this.provider.transaction(
      async () => {
        for (
          const document
          of documents
        ) {
          await this.provider.query(
            `
              INSERT INTO ${this.tableName} (
                id,
                resource_id,
                resource_type,
                content,
                created_at,
                updated_at
              )
              VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                NOW()
              )
              ON CONFLICT (
                resource_type,
                resource_id
              )
              DO UPDATE SET
                id = EXCLUDED.id,
                content = EXCLUDED.content,
                updated_at = NOW()
            `,
            [
              document.id.toString(),
              document.resourceId.toString(),
              document.resourceType,
              JSON.stringify(
                document.content,
              ),
              document.createdAt,
            ],
          );
        }
      },
    );
  }

  async delete(
    id: string,
  ): Promise<void> {
    await this.provider.query(
      `
        DELETE FROM ${this.tableName}
        WHERE id = $1
      `,
      [id],
    );
  }

  private toDocument(
    row: any,
  ): SearchDocument {
    return new SearchDocument({
      id:
        new UniqueEntityId(
          row.id,
        ),

      resourceId:
        new UniqueEntityId(
          row.resource_id,
        ),

      resourceType:
        row.resource_type as
          SearchResourceType,

      content:
        row.content ?? {},

      createdAt:
        new Date(
          row.created_at,
        ),
    });
  }

  private async buildFacets(
    whereClause: string,
    params: readonly unknown[],
    fields: readonly string[],
  ): Promise<
    Record<
      string,
      Record<string, number>
    >
  > {
    const facets:
      Record<
        string,
        Record<string, number>
      > = {};

    for (
      const field of fields
    ) {
      /*
       * Facet field names come from the
       * validated application request.
       * Only known JSON fields are permitted.
       */
      const allowedFields =
        new Set([
          'resourceType',
          'ontology',
          'relationshipType',
          'category',
          'status',
          'language',
          'author',
        ]);

      if (
        !allowedFields.has(field)
      ) {
        continue;
      }

      const expression =
        field ===
        'resourceType'
          ? 'resource_type'
          : `content->>'${field}'`;

      const result =
        await this.provider.query(
          `
            SELECT
              ${expression} AS value,
              COUNT(*)::int AS count
            FROM ${this.tableName}
            ${whereClause}
            GROUP BY value
            ORDER BY count DESC
            LIMIT 50
          `,
          [...params],
        );

      facets[field] = {};

      for (
        const row of result.rows
      ) {
        if (
          row.value !== null &&
          row.value !== undefined
        ) {
          facets[field][
            String(row.value)
          ] = Number(
            row.count,
          );
        }
      }
    }

    return facets;
  }
}