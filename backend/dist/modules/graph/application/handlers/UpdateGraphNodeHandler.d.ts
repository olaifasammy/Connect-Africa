import { UpdateGraphNodeCommand } from '../commands/UpdateGraphNodeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
export declare class UpdateGraphNodeHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(command: UpdateGraphNodeCommand, userId: string, ipAddress: string): Promise<void>;
}
