import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { RestoreMediaCommand } from '../commands/RestoreMediaCommand';
export declare class RestoreMediaHandler {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    handle(command: RestoreMediaCommand): Promise<void>;
}
