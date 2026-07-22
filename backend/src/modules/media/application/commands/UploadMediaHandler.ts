import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { UploadMediaCommand } from '../commands/UploadMediaCommand';
import { Media } from '../../domain/models/Media';
import { FileName } from '../../domain/value-objects/FileName';
import { MimeType } from '../../domain/value-objects/MimeType';
import { MediaResponseDto } from '../dtos/MediaResponseDto';
import { StorageProvider } from '@shared/infrastructure/storage/StorageProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { MediaStatus, MediaStatusType } from '../../domain/value-objects/MediaStatus';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';

export class UploadMediaHandler {
  constructor(
    private readonly mediaRepository: IMediaRepository,
    private readonly storageProvider: StorageProvider,
    private readonly eventBus: EventBus
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
        ownerId: new UniqueEntityId(command.userId),
      });

      await this.mediaRepository.save(media);
      
      // Decoupled audit logging
      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'UPLOAD_MEDIA',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: media.id.toString(),
        resourceType: 'MEDIA',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
      }));

      return {
        id: media.id.toString(),
        fileName: media.fileName.value,
        mimeType: media.mimeType.value,
        uploadedAt: media.uploadedAt.toISOString(),
      };
    } catch (error) {
      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'UPLOAD_MEDIA',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: 'MEDIA',
        resourceType: 'MEDIA',
        metadata: [{ key: 'status', value: 'FAILURE' }]
      }));
      throw error;
    }
  }
}
