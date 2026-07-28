import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { DeleteMediaCommand } from '../commands/DeleteMediaCommand';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class DeleteMediaHandler {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async handle(command: DeleteMediaCommand): Promise<void> {
    const mediaId = new UniqueEntityId(command.id);
    try {
      await this.mediaRepository.delete(mediaId);

      AuditLogger.log({
        user: 'system',
        action: 'DELETE_MEDIA',
        resource: command.id,
        status: 'SUCCESS',
      });
    } catch (error) {
      AuditLogger.log({
        user: 'system',
        action: 'DELETE_MEDIA',
        resource: command.id,
        status: 'FAILURE',
      });
      throw error;
    }
  }
}
