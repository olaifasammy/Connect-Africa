import { CreateSourceCommand } from '../commands/CreateSourceCommand';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class CreateSourceHandler {
    private readonly repository;
    private readonly eventBus;
    constructor(repository: ISourceRepository, eventBus: EventBus);
    handle(command: CreateSourceCommand): Promise<string>;
}
