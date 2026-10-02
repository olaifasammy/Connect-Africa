import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { ExportEntitiesQuery } from '../queries/ExportEntitiesQuery';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

export interface ExportEntitiesResponse {
  data: string;
  contentType: string;
  fileName: string;
}

interface EntityRow {
  id: string;
  name: string;
  type: string;
  slug: string;
  description: string | null;
  source: string | null;
  status: string;
  created_at: Date;
}

@provide(ExportEntitiesQueryHandler, true)
@injectable()
export class ExportEntitiesQueryHandler
  implements IQueryHandler<ExportEntitiesQuery, ExportEntitiesResponse>
{
  constructor(
    @inject(PostgresProvider)
    private readonly postgresProvider: PostgresProvider,
  ) {}

  async handle(
    query: ExportEntitiesQuery,
  ): Promise<ExportEntitiesResponse> {
    const { format, status, type } = query;

    let sql = 'SELECT id, name, type, slug, description, source, status, created_at FROM entities WHERE 1=1';
    const params: any[] = [];

    if (status) {
      sql += ` AND status = $${params.length + 1}`;
      params.push(status);
    }

    if (type) {
      sql += ` AND type = $${params.length + 1}`;
      params.push(type);
    }

    sql += ' ORDER BY created_at DESC';

    const result = await this.postgresProvider.query<EntityRow>(sql, params);
    const rows = result.rows;

    if (format === 'csv') {
      const headers = ['id', 'name', 'type', 'slug', 'description', 'source', 'status', 'createdAt'];
      const csvLines = [headers.join(',')];

      for (const row of rows) {
        const line = [
          row.id,
          `"${(row.name || '').replace(/"/g, '""')}"`,
          row.type,
          row.slug,
          `"${(row.description || '').replace(/"/g, '""')}"`,
          `"${(row.source || '').replace(/"/g, '""')}"`,
          row.status,
          new Date(row.created_at).toISOString(),
        ];
        csvLines.push(line.join(','));
      }

      return {
        data: csvLines.join('\n'),
        contentType: 'text/csv',
        fileName: `entities_export_${Date.now()}.csv`,
      };
    } else {
      const data = JSON.stringify(
        rows.map((row) => ({
          id: row.id,
          name: row.name,
          type: row.type,
          slug: row.slug,
          description: row.description || undefined,
          source: row.source || undefined,
          status: row.status,
          createdAt: new Date(row.created_at).toISOString(),
        })),
        null,
        2
      );

      return {
        data,
        contentType: 'application/json',
        fileName: `entities_export_${Date.now()}.json`,
      };
    }
  }
}
