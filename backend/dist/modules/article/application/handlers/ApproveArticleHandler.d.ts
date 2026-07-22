import { ApproveArticleCommand } from '../commands/ApproveArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class ApproveArticleHandler {
    private readonly repository;
    private readonly eventBus;
    constructor(repository: IArticleRepository, eventBus: EventBus);
    handle(command: ApproveArticleCommand): Promise<void>;
}
