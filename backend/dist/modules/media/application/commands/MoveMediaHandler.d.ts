import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { MoveMediaCommand } from '../commands/MoveMediaCommand';
import { StorageProvider } from '../../../../shared/infrastructure/storage/StorageProvider';
export declare class MoveMediaHandler {
    private readonly mediaRepository;
    private readonly storageProvider;
    constructor(mediaRepository: IMediaRepository, storageProvider: StorageProvider);
    handle(command: MoveMediaCommand): Promise<void>;
}
