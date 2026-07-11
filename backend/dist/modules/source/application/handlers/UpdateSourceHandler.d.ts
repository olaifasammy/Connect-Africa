import { UpdateSourceCommand, DeleteSourceCommand } from '../commands/SourceCommands';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
export declare class UpdateSourceHandler {
    private readonly repository;
    constructor(repository: ISourceRepository);
    handle(command: UpdateSourceCommand): Promise<void>;
}
export declare class DeleteSourceHandler {
    private readonly repository;
    constructor(repository: ISourceRepository);
    handle(command: DeleteSourceCommand): Promise<void>;
}
