import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { CopyMediaCommand } from '../commands/CopyMediaCommand';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class CopyMediaHandler {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async handle(command: CopyMediaCommand): Promise<void> {
    try {
      const media = await this.mediaRepository.findById(new UniqueEntityId(command.id));
      if (!media) throw new Error('Media not found');
      
      // Implement Copy logic (Create new entity, copy file in storage)
      
      AuditLogger.log({
        user: 'system',
        action: 'COPY_MEDIA',
        resource: media.id.toString(),
        status: 'SUCCESS',
      });
    } catch (error) {
      AuditLogger.log({
        user: 'system',
        action: 'COPY_MEDIA',
        resource: 'unknown',
        status: 'FAILURE',
      });
      throw error;
    }
  }
}
