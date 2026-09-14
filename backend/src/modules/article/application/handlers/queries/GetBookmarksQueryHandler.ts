import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetBookmarksQuery } from '@modules/article/application/queries/GetBookmarksQuery';
import { IUserBookmarkRepository } from '@modules/article/domain/repositories/IUserBookmarkRepository';
import { IArticleRepository } from '@modules/article/domain/repositories/IArticleRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(GetBookmarksQueryHandler, true)
@injectable()
export class GetBookmarksQueryHandler
  implements IQueryHandler<GetBookmarksQuery, any[]>
{
  constructor(
    @inject('IUserBookmarkRepository')
    private readonly bookmarkRepository: IUserBookmarkRepository,
    @inject('IArticleRepository')
    private readonly articleRepository: IArticleRepository,
  ) {}

  async handle(query: GetBookmarksQuery): Promise<any[]> {
    try {
      const bookmarkIds = await this.bookmarkRepository.getBookmarks(
        new UniqueEntityId(query.userId),
      );

      const articles = await Promise.all(
        bookmarkIds.map((articleId) =>
          this.articleRepository.findById(articleId),
        ),
      );

      const result = articles.filter(
        (article): article is NonNullable<typeof article> => article !== null,
      );

      AuditLogger.log({
        user: query.userId,
        action: 'GET_BOOKMARKS',
        resource: 'BOOKMARKS',
        status: 'SUCCESS',
        ipAddress: query.ipAddress,
      });

      return result;
    } catch (error) {
      AuditLogger.log({
        user: query.userId,
        action: 'GET_BOOKMARKS',
        resource: 'BOOKMARKS',
        status: 'FAILURE',
        ipAddress: query.ipAddress,
      });

      throw error instanceof AuthenticationError
        ? error
        : new AuthenticationError('Failed to get bookmarks');
    }
  }
}
