import { CreateArticleCommand } from '../commands/CreateArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class CreateArticleHandler {
    private readonly repository;
    private readonly eventBus;
    constructor(repository: IArticleRepository, eventBus: EventBus);
    handle(command: CreateArticleCommand): Promise<string>;
}
