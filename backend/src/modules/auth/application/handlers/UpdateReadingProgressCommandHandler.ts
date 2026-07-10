import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { UpdateReadingProgressCommand } from '../commands/UpdateReadingProgressCommand';
import { IContinueReadingRepository } from '@modules/auth/domain/repositories/IContinueReadingRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { ContinueReadingError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class UpdateReadingProgressCommandHandler implements ICommandHandler<UpdateReadingProgressCommand, void> {
  constructor(
    private repository: IContinueReadingRepository
  ) {}

  async handle(command: UpdateReadingProgressCommand): Promise<void> {
    try {
      const userId = new UniqueEntityId(command.userId);
      const articleId = new UniqueEntityId(command.articleId);
      
      await this.repository.updateProgress(userId, articleId, command.progress);
      
      AuditLogger.log({
        user: command.userId,
        action: 'UPDATE_READING_PROGRESS',
        resource: command.articleId,
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'UPDATE_READING_PROGRESS',
        resource: command.articleId,
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof ContinueReadingError ? error : new ContinueReadingError('Failed to update reading progress');
    }
  }
}
