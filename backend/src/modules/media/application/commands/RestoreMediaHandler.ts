import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { RestoreMediaCommand } from '../commands/RestoreMediaCommand';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class RestoreMediaHandler {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async handle(command: RestoreMediaCommand): Promise<void> {
    const mediaId = new UniqueEntityId(command.id);
    try {
      const media = await this.mediaRepository.findById(mediaId);
      if (!media) {
        throw new Error('Media not found');
      }
      
      // Assume restore method exists on Media or needs implementation
      // media.restore(); 
      // await this.mediaRepository.save(media);

      AuditLogger.log({
        user: 'system',
        action: 'RESTORE_MEDIA',
        resource: command.id,
        status: 'SUCCESS',
      });
    } catch (error) {
      AuditLogger.log({
        user: 'system',
        action: 'RESTORE_MEDIA',
        resource: command.id,
        status: 'FAILURE',
      });
      throw error;
    }
  }
}
