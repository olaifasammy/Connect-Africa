import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetBookmarksQuery } from '@modules/auth/application/queries/GetBookmarksQuery';
import { IUserBookmarkRepository } from '@modules/auth/domain/repositories/IUserBookmarkRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class GetBookmarksQueryHandler implements IQueryHandler<GetBookmarksQuery, any> {
  constructor(private bookmarkRepository: IUserBookmarkRepository) {}

  async handle(query: GetBookmarksQuery): Promise<any> {
    try {
      const bookmarks = await this.bookmarkRepository.getBookmarks(new UniqueEntityId(query.userId));
      
      AuditLogger.log({
        user: query.userId,
        action: 'GET_BOOKMARKS',
        resource: 'BOOKMARKS',
        status: 'SUCCESS',
        ipAddress: query.ipAddress
      });
      
      return bookmarks;
    } catch (error) {
      AuditLogger.log({
        user: query.userId,
        action: 'GET_BOOKMARKS',
        resource: 'BOOKMARKS',
        status: 'FAILURE',
        ipAddress: query.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to get bookmarks');
    }
  }
}
