import { DeleteGraphEdgeCommand } from '../commands/DeleteGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class DeleteGraphEdgeHandler {
    private readonly repository;
    private readonly eventBus;
    constructor(repository: IGraphRepository, eventBus: EventBus);
    handle(command: DeleteGraphEdgeCommand, userId: string, ipAddress: string): Promise<void>;
}
