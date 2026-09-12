import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IContinueReadingRepository } from '../../domain/repositories/IContinueReadingRepository';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide('IContinueReadingRepository', true)
@injectable()
export class PostgresContinueReadingRepository implements IContinueReadingRepository {
  constructor(
    @inject('PostgresProvider') private readonly provider: PostgresProvider
  ) {}

  async updateProgress(userId: UniqueEntityId, articleId: UniqueEntityId, progress: number): Promise<void> {
    await this.provider.query(
      `
        INSERT INTO reading_progress (user_id, article_id, progress, updated_at)
        VALUES ($1, $2, $3, NOW())
        ON CONFLICT (user_id, article_id)
        DO UPDATE SET progress = EXCLUDED.progress, updated_at = NOW()
      `,
      [userId.toString(), articleId.toString(), progress]
    );
  }

  async getProgress(userId: UniqueEntityId, articleId: UniqueEntityId): Promise<number | null> {
    const result = await this.provider.query<{ progress: number | string }>(
      `
        SELECT progress
        FROM reading_progress
        WHERE user_id = $1 AND article_id = $2
        LIMIT 1
      `,
      [userId.toString(), articleId.toString()]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return Number(result.rows[0].progress);
  }
}
