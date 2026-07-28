import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { RenameMediaCommand } from '../commands/RenameMediaCommand';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class RenameMediaHandler {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async handle(command: RenameMediaCommand): Promise<void> {
    const mediaId = new UniqueEntityId(command.data.id);
    try {
      const media = await this.mediaRepository.findById(mediaId);
      if (!media) {
        throw new Error('Media not found');
      }

      media.rename(command.data.newName);
      await this.mediaRepository.save(media);

      AuditLogger.log({
        user: 'system',
        action: 'RENAME_MEDIA',
        resource: command.data.id,
        status: 'SUCCESS',
      });
    } catch (error) {
      AuditLogger.log({
        user: 'system',
        action: 'RENAME_MEDIA',
        resource: command.data.id,
        status: 'FAILURE',
      });
      throw error;
    }
  }
}
