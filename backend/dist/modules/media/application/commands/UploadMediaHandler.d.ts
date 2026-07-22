import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { UploadMediaCommand } from '../commands/UploadMediaCommand';
import { MediaResponseDto } from '../dtos/MediaResponseDto';
import { StorageProvider } from '../../../../shared/infrastructure/storage/StorageProvider';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class UploadMediaHandler {
    private readonly mediaRepository;
    private readonly storageProvider;
    private readonly eventBus;
    constructor(mediaRepository: IMediaRepository, storageProvider: StorageProvider, eventBus: EventBus);
    handle(command: UploadMediaCommand): Promise<MediaResponseDto>;
}
