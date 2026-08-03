import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { AddToReadingHistoryCommand } from '../commands/AddToReadingHistoryCommand';
import { IReadingHistoryRepository } from '@modules/auth/domain/repositories/IReadingHistoryRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class AddToReadingHistoryCommandHandler implements ICommandHandler<AddToReadingHistoryCommand, void> {
  constructor(
    private repository: IReadingHistoryRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: AddToReadingHistoryCommand): Promise<void> {
    try {
      const userId = new UniqueEntityId(command.userId);
      const articleId = new UniqueEntityId(command.articleId);
      
      await this.repository.addEntry(userId, articleId);
      
      AuditLogger.log({
        user: command.userId,
        action: 'ADD_READING_HISTORY',
        resource: command.articleId,
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'ADD_READING_HISTORY',
        resource: command.articleId,
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to add to reading history');
    }
  }
}
