import { UpdateGraphEdgeCommand } from '../commands/UpdateGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class UpdateGraphEdgeHandler {
    private readonly repository;
    private readonly eventBus;
    constructor(repository: IGraphRepository, eventBus: EventBus);
    handle(command: UpdateGraphEdgeCommand, userId: string, ipAddress: string): Promise<void>;
}
