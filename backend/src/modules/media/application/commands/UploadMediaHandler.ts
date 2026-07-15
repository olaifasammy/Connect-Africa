import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { UploadMediaCommand } from '../commands/UploadMediaCommand';
import { Media } from '../../domain/models/Media';
import { FileName } from '../../domain/value-objects/FileName';
import { MimeType } from '../../domain/value-objects/MimeType';
import { MediaResponseDto } from '../dtos/MediaResponseDto';
import { StorageProvider } from '@shared/infrastructure/storage/StorageProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';
import { MediaStatus, MediaStatusType } from '../../domain/value-objects/MediaStatus';

export class UploadMediaHandler {
  constructor(
    private readonly mediaRepository: IMediaRepository,
    private readonly storageProvider: StorageProvider
  ) {}

  async handle(command: UploadMediaCommand): Promise<MediaResponseDto> {
    const filePath = `media/${new UniqueEntityId().toString()}-${command.data.fileName}`;
    try {
      await this.storageProvider.upload(filePath, command.data.fileBuffer);

      const media = Media.create({
        fileName: new FileName(command.data.fileName),
        mimeType: new MimeType(command.data.mimeType),
        filePath,
        fileSize: command.data.fileBuffer.length,
        uploadedAt: new Date(),
        status: MediaStatus.create(MediaStatusType.PENDING),
        title: command.data.fileName,
        ownerId: new UniqueEntityId(),
      });

      await this.mediaRepository.save(media);
      
      AuditLogger.log({
        user: 'system',
        action: 'UPLOAD_MEDIA',
        resource: media.id.toString(),
        status: 'SUCCESS',
      });

      return {
        id: media.id.toString(),
        fileName: media.fileName.value,
        mimeType: media.mimeType.value,
        uploadedAt: media.uploadedAt.toISOString(),
      };
    } catch (error) {
      AuditLogger.log({
        user: 'system',
        action: 'UPLOAD_MEDIA',
        resource: 'unknown',
        status: 'FAILURE',
      });
      throw error;
    }
  }
}
