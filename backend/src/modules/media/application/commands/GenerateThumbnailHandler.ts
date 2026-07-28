import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { GenerateThumbnailCommand } from '../commands/GenerateThumbnailCommand';
import { ThumbnailService } from '../services/ThumbnailService';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class GenerateThumbnailHandler {
  constructor(
    private readonly mediaRepository: IMediaRepository,
    private readonly thumbnailService: ThumbnailService
  ) {}

  async handle(command: GenerateThumbnailCommand): Promise<void> {
    const mediaId = new UniqueEntityId(command.data.mediaId);
    try {
      const media = await this.mediaRepository.findById(mediaId);
      if (!media) throw new Error('Media not found');

      await this.thumbnailService.generate(media);

      AuditLogger.log({
        user: 'system',
        action: 'GENERATE_THUMBNAIL',
        resource: command.data.mediaId,
        status: 'SUCCESS',
      });
    } catch (error) {
      AuditLogger.log({
        user: 'system',
        action: 'GENERATE_THUMBNAIL',
        resource: command.data.mediaId,
        status: 'FAILURE',
      });
      throw error;
    }
  }
}
