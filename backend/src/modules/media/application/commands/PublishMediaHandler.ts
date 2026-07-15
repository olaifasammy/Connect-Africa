import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { PublishMediaCommand } from '../commands/PublishMediaCommand';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class PublishMediaHandler {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async handle(command: PublishMediaCommand): Promise<void> {
    const mediaId = new UniqueEntityId(command.id);
    try {
      const media = await this.mediaRepository.findById(mediaId);
      if (!media) {
        throw new Error('Media not found');
      }
      
      // await this.mediaRepository.save(media);

      AuditLogger.log({
        user: 'system',
        action: 'PUBLISH_MEDIA',
        resource: command.id,
        status: 'SUCCESS',
      });
    } catch (error) {
      AuditLogger.log({
        user: 'system',
        action: 'PUBLISH_MEDIA',
        resource: command.id,
        status: 'FAILURE',
      });
      throw error;
    }
  }
}
