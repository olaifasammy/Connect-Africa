import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { ArchiveMediaCommand } from '../commands/ArchiveMediaCommand';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class ArchiveMediaHandler {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async handle(command: ArchiveMediaCommand): Promise<void> {
    const mediaId = new UniqueEntityId(command.id);
    try {
      const media = await this.mediaRepository.findById(mediaId);
      if (!media) {
        throw new Error('Media not found');
      }

      media.archive();
      await this.mediaRepository.save(media);

      AuditLogger.log({
        user: 'system',
        action: 'ARCHIVE_MEDIA',
        resource: command.id,
        status: 'SUCCESS',
      });
    } catch (error) {
      AuditLogger.log({
        user: 'system',
        action: 'ARCHIVE_MEDIA',
        resource: command.id,
        status: 'FAILURE',
      });
      throw error;
    }
  }
}
