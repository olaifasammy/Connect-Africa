import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IReadingHistoryRepository } from '../../domain/repositories/IReadingHistoryRepository';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide('IReadingHistoryRepository', true)
@injectable()
export class PostgresReadingHistoryRepository implements IReadingHistoryRepository {
  constructor(
    @inject('PostgresProvider') private readonly provider: PostgresProvider
  ) {}

  async addEntry(userId: UniqueEntityId, articleId: UniqueEntityId): Promise<void> {
    await this.provider.query(
      `
        INSERT INTO reading_history (user_id, article_id, timestamp)
        VALUES ($1, $2, NOW())
      `,
      [userId.toString(), articleId.toString()]
    );
  }

  async getHistory(userId: UniqueEntityId): Promise<{ articleId: UniqueEntityId; timestamp: Date }[]> {
    const result = await this.provider.query<{ article_id: string; timestamp: Date | string }>(
      `
        SELECT article_id, timestamp
        FROM reading_history
        WHERE user_id = $1
        ORDER BY timestamp DESC
        LIMIT 50
      `,
      [userId.toString()]
    );
    return result.rows.map((row) => ({
      articleId: new UniqueEntityId(row.article_id),
      timestamp: new Date(row.timestamp)
    }));
  }
}
