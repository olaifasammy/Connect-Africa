import { UpdateGraphEdgeCommand } from '../commands/UpdateGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
export declare class UpdateGraphEdgeHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(command: UpdateGraphEdgeCommand, userId: string, ipAddress: string): Promise<void>;
}
