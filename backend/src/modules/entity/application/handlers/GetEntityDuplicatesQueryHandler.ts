import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetEntityDuplicatesQuery } from '../queries/GetEntityDuplicatesQuery';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

export interface DuplicatePairResponse {
  sourceEntity: { id: string; name: string; type: string };
  duplicateEntity: { id: string; name: string; type: string };
  confidenceScore: number; // percentage quality similarity score
}

@provide(GetEntityDuplicatesQueryHandler, true)
@injectable()
export class GetEntityDuplicatesQueryHandler
  implements IQueryHandler<GetEntityDuplicatesQuery, DuplicatePairResponse[]>
{
  constructor(
    @inject(PostgresProvider)
    private readonly postgresProvider: PostgresProvider,
  ) {}

  async handle(
    query: GetEntityDuplicatesQuery,
  ): Promise<DuplicatePairResponse[]> {
    const threshold = query.threshold || 0.4;

    try {
      // Find similar pairs of entities within same type using postgres pg_trgm similarity
      const result = await this.postgresProvider.query<{
        source_id: string;
        source_name: string;
        source_type: string;
        duplicate_id: string;
        duplicate_name: string;
        duplicate_type: string;
        similarity_score: number;
      }>(
        `
          SELECT e1.id as source_id, e1.name as source_name, e1.type as source_type,
                 e2.id as duplicate_id, e2.name as duplicate_name, e2.type as duplicate_type,
                 similarity(e1.name, e2.name) as similarity_score
          FROM entities e1
          JOIN entities e2 ON e1.id < e2.id AND e1.type = e2.type
          WHERE similarity(e1.name, e2.name) > $1
          ORDER BY similarity_score DESC
          LIMIT 50
        `,
        [threshold]
      );

      return result.rows.map((row) => ({
        sourceEntity: {
          id: row.source_id,
          name: row.source_name,
          type: row.source_type,
        },
        duplicateEntity: {
          id: row.duplicate_id,
          name: row.duplicate_name,
          type: row.duplicate_type,
        },
        confidenceScore: Math.round(row.similarity_score * 100),
      }));
    } catch {
      // In case pg_trgm similarity fails or database is empty, return an empty array
      return [];
    }
  }
}
