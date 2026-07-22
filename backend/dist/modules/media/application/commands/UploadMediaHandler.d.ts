import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { UploadMediaCommand } from '../commands/UploadMediaCommand';
import { MediaResponseDto } from '../dtos/MediaResponseDto';
import { StorageProvider } from '../../../../shared/infrastructure/storage/StorageProvider';
import { IAuditRepository } from '../../../audit/public';
export declare class UploadMediaHandler {
    private readonly mediaRepository;
    private readonly storageProvider;
    private readonly auditRepository;
    constructor(mediaRepository: IMediaRepository, storageProvider: StorageProvider, auditRepository: IAuditRepository);
    handle(command: UploadMediaCommand): Promise<MediaResponseDto>;
}
