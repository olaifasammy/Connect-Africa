import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { UploadMediaCommand } from '../commands/UploadMediaCommand';
import { Media } from '../../domain/models/Media';
import { FileName } from '../../domain/value-objects/FileName';
import { MimeType } from '../../domain/value-objects/MimeType';
import { MediaResponseDto } from '../dtos/MediaResponseDto';
import { StorageProvider } from '@shared/infrastructure/storage/StorageProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { MediaStatus, MediaStatusType } from '../../domain/value-objects/MediaStatus';
import { IAuditRepository } from '@modules/audit/public';
import { 
  AuditEntry, 
  AuditActor, 
  AuditResource, 
  AuditMetadata, 
  CorrelationId, 
  Timestamp, 
  UserId, 
  ResourceId, 
  IPAddress, 
  UserAgent 
} from '@modules/audit/public';

export class UploadMediaHandler {
  constructor(
    private readonly mediaRepository: IMediaRepository,
    private readonly storageProvider: StorageProvider,
    private readonly auditRepository: IAuditRepository
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
      
      const auditEntry = AuditEntry.create({
        action: 'UPLOAD_MEDIA',
        actor: AuditActor.create({
          userId: new UserId(command.userId),
          actorType: 'USER',
          ipAddress: new IPAddress('127.0.0.1'),
          userAgent: new UserAgent('unknown')
        }),
        resource: AuditResource.create({
          id: new ResourceId(media.id.toString()),
          type: 'MEDIA'
        }),
        metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
        correlationId: new CorrelationId(new UniqueEntityId().toString()),
        timestamp: new Timestamp(new Date())
      });
      
      await this.auditRepository.log(auditEntry);

      return {
        id: media.id.toString(),
        fileName: media.fileName.value,
        mimeType: media.mimeType.value,
        uploadedAt: media.uploadedAt.toISOString(),
      };
    } catch (error) {
      // Log failure with audit repository as well
      throw error;
    }
  }
}
