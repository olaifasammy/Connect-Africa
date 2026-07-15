import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { RenameMediaCommand } from '../commands/RenameMediaCommand';
export declare class RenameMediaHandler {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    handle(command: RenameMediaCommand): Promise<void>;
}
