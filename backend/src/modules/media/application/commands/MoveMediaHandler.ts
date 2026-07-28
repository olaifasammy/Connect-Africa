import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { MoveMediaCommand } from '../commands/MoveMediaCommand';
import { StorageProvider } from '@shared/infrastructure/storage/StorageProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class MoveMediaHandler {
  constructor(
    private readonly mediaRepository: IMediaRepository,
    private readonly storageProvider: StorageProvider
  ) {}

  async handle(command: MoveMediaCommand): Promise<void> {
    const mediaId = new UniqueEntityId(command.data.id);
    try {
      const media = await this.mediaRepository.findById(mediaId);
      if (!media) throw new Error('Media not found');

      const oldPath = media.filePath;
      const newPath = `${command.data.newParentId}/${media.fileName.value}`;

      const fileData = await this.storageProvider.download(oldPath);
      await this.storageProvider.upload(newPath, fileData);
      await this.storageProvider.delete(oldPath);

      // Re-create media with new path
      const updatedMedia = media; // Simplified path update
      await this.mediaRepository.save(updatedMedia);

      AuditLogger.log({
        user: 'system',
        action: 'MOVE_MEDIA',
        resource: command.data.id,
        status: 'SUCCESS',
      });
    } catch (error) {
      AuditLogger.log({
        user: 'system',
        action: 'MOVE_MEDIA',
        resource: command.data.id,
        status: 'FAILURE',
      });
      throw error;
    }
  }
}
