import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IUserBookmarkRepository } from '../../domain/repositories/IUserBookmarkRepository';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide('IUserBookmarkRepository', true)
@injectable()
export class PostgresUserBookmarkRepository implements IUserBookmarkRepository {
  constructor(
    @inject('PostgresProvider') private readonly provider: PostgresProvider
  ) {}

  async addBookmark(userId: UniqueEntityId, articleId: UniqueEntityId): Promise<void> {
    await this.provider.query(
      `
        INSERT INTO user_bookmarks (user_id, article_id, created_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT DO NOTHING
      `,
      [userId.toString(), articleId.toString()]
    );
  }

  async removeBookmark(userId: UniqueEntityId, articleId: UniqueEntityId): Promise<void> {
    await this.provider.query(
      `
        DELETE FROM user_bookmarks
        WHERE user_id = $1 AND article_id = $2
      `,
      [userId.toString(), articleId.toString()]
    );
  }

  async getBookmarks(userId: UniqueEntityId): Promise<UniqueEntityId[]> {
    const result = await this.provider.query<{ article_id: string }>(
      `
        SELECT article_id
        FROM user_bookmarks
        WHERE user_id = $1
        ORDER BY created_at DESC
      `,
      [userId.toString()]
    );
    return result.rows.map((row) => new UniqueEntityId(row.article_id));
  }
}
