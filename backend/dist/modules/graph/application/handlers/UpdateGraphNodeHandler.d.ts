import { UpdateGraphNodeCommand } from '../commands/UpdateGraphNodeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class UpdateGraphNodeHandler {
    private readonly repository;
    private readonly eventBus;
    constructor(repository: IGraphRepository, eventBus: EventBus);
    handle(command: UpdateGraphNodeCommand, userId: string, ipAddress: string): Promise<void>;
}
