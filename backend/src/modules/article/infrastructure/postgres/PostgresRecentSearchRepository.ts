import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IRecentSearchRepository } from '../../domain/repositories/IRecentSearchRepository';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide('IRecentSearchRepository', true)
@injectable()
export class PostgresRecentSearchRepository implements IRecentSearchRepository {
  constructor(
    @inject('PostgresProvider') private readonly provider: PostgresProvider
  ) {}

  async addSearch(userId: UniqueEntityId, query: string): Promise<void> {
    await this.provider.query(
      `
        INSERT INTO recent_searches (user_id, query, created_at)
        VALUES ($1, $2, NOW())
      `,
      [userId.toString(), query]
    );
  }

  async getRecentSearches(userId: UniqueEntityId): Promise<string[]> {
    const result = await this.provider.query<{ query: string }>(
      `
        SELECT DISTINCT query
        FROM recent_searches
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT 20
      `,
      [userId.toString()]
    );
    return result.rows.map((row) => row.query);
  }
}
