import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { AddBookmarkCommand } from '../commands/AddBookmarkCommand';
import { IUserBookmarkRepository } from '@modules/auth/domain/repositories/IUserBookmarkRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { ArticleBookmarkedEvent } from '@modules/auth/domain/events/ArticleBookmarkedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class AddBookmarkCommandHandler implements ICommandHandler<AddBookmarkCommand, void> {
  constructor(
    private bookmarkRepository: IUserBookmarkRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: AddBookmarkCommand): Promise<void> {
    try {
      const userId = new UniqueEntityId(command.userId);
      const articleId = new UniqueEntityId(command.articleId);
      
      await this.bookmarkRepository.addBookmark(userId, articleId);
      
      AuditLogger.log({
        user: command.userId,
        action: 'ADD_BOOKMARK',
        resource: command.articleId,
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new ArticleBookmarkedEvent(userId, articleId));
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'ADD_BOOKMARK',
        resource: command.articleId,
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to add bookmark');
    }
  }
}
