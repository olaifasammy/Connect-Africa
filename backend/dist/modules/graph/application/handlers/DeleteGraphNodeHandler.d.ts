import { DeleteGraphNodeCommand } from '../commands/DeleteGraphNodeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class DeleteGraphNodeHandler {
    private readonly repository;
    private readonly eventBus;
    constructor(repository: IGraphRepository, eventBus: EventBus);
    handle(command: DeleteGraphNodeCommand, userId: string, ipAddress: string): Promise<void>;
}
