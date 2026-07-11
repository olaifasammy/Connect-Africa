import { DeleteGraphEdgeCommand } from '../commands/DeleteGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
export declare class DeleteGraphEdgeHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(command: DeleteGraphEdgeCommand, userId: string, ipAddress: string): Promise<void>;
}
