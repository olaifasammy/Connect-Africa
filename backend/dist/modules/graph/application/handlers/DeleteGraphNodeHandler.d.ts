import { DeleteGraphNodeCommand } from '../commands/DeleteGraphNodeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
export declare class DeleteGraphNodeHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(command: DeleteGraphNodeCommand, userId: string, ipAddress: string): Promise<void>;
}
