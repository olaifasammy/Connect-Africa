import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { UploadMediaCommand } from '../commands/UploadMediaCommand';
import { MediaResponseDto } from '../dtos/MediaResponseDto';
import { StorageProvider } from '../../../../shared/infrastructure/storage/StorageProvider';
export declare class UploadMediaHandler {
    private readonly mediaRepository;
    private readonly storageProvider;
    constructor(mediaRepository: IMediaRepository, storageProvider: StorageProvider);
    handle(command: UploadMediaCommand): Promise<MediaResponseDto>;
}
