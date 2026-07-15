import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { UpdateMediaCommand } from '../commands/UpdateMediaCommand';
export declare class UpdateMediaHandler {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    handle(command: UpdateMediaCommand): Promise<void>;
}
