import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RemoveBookmarkCommand } from '../commands/RemoveBookmarkCommand';
import { IUserBookmarkRepository } from '@modules/article/domain/repositories/IUserBookmarkRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(RemoveBookmarkCommandHandler, true)
@injectable()
export class RemoveBookmarkCommandHandler
  implements ICommandHandler<RemoveBookmarkCommand, void>
{
  constructor(
    @inject('IUserBookmarkRepository')
    private readonly bookmarkRepository: IUserBookmarkRepository,
  ) {}

  async handle(command: RemoveBookmarkCommand): Promise<void> {
    try {
      await this.bookmarkRepository.removeBookmark(
        new UniqueEntityId(command.userId),
        new UniqueEntityId(command.articleId),
      );

      AuditLogger.log({
        user: command.userId,
        action: 'REMOVE_BOOKMARK',
        resource: command.articleId,
        status: 'SUCCESS',
        ipAddress: command.ipAddress,
      });
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'REMOVE_BOOKMARK',
        resource: command.articleId,
        status: 'FAILURE',
        ipAddress: command.ipAddress,
      });

      throw error instanceof AuthenticationError
        ? error
        : new AuthenticationError('Failed to remove bookmark');
    }
  }
}
