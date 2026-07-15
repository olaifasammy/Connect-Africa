import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { PublishMediaCommand } from '../commands/PublishMediaCommand';
export declare class PublishMediaHandler {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    handle(command: PublishMediaCommand): Promise<void>;
}
