import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetBookmarksQuery } from '@modules/auth/application/queries/GetBookmarksQuery';
import { IUserBookmarkRepository } from '@modules/auth/domain/repositories/IUserBookmarkRepository';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class GetBookmarksQueryHandler implements IQueryHandler<GetBookmarksQuery, any> {
  constructor(
    private bookmarkRepository: IUserBookmarkRepository,
    private eventBus: EventBus
  ) {}

  async handle(query: GetBookmarksQuery): Promise<any> {
    try {
      const bookmarks = await this.bookmarkRepository.getBookmarks(new UniqueEntityId(query.userId));
      
      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'GET_BOOKMARKS',
        actorId: query.userId,
        actorType: 'USER',
        resourceId: 'BOOKMARKS',
        resourceType: 'BOOKMARKS',
        ipAddress: query.ipAddress || '127.0.0.1',
        userAgent: 'unknown',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
      }));
      
      return bookmarks;
    } catch (error) {
      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'GET_BOOKMARKS',
        actorId: query.userId,
        actorType: 'USER',
        resourceId: 'BOOKMARKS',
        resourceType: 'BOOKMARKS',
        ipAddress: query.ipAddress || '127.0.0.1',
        userAgent: 'unknown',
        metadata: [{ key: 'status', value: 'FAILURE' }]
      }));
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to get bookmarks');
    }
  }
}
