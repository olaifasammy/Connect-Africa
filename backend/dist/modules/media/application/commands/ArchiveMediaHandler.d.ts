import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { ArchiveMediaCommand } from '../commands/ArchiveMediaCommand';
export declare class ArchiveMediaHandler {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    handle(command: ArchiveMediaCommand): Promise<void>;
}
