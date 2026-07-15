import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { GenerateThumbnailCommand } from '../commands/GenerateThumbnailCommand';
import { ThumbnailService } from '../services/ThumbnailService';
export declare class GenerateThumbnailHandler {
    private readonly mediaRepository;
    private readonly thumbnailService;
    constructor(mediaRepository: IMediaRepository, thumbnailService: ThumbnailService);
    handle(command: GenerateThumbnailCommand): Promise<void>;
}
