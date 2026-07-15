import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { CopyMediaCommand } from '../commands/CopyMediaCommand';
export declare class CopyMediaHandler {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    handle(command: CopyMediaCommand): Promise<void>;
}
