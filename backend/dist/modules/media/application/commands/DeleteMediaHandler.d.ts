import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { DeleteMediaCommand } from '../commands/DeleteMediaCommand';
export declare class DeleteMediaHandler {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    handle(command: DeleteMediaCommand): Promise<void>;
}
