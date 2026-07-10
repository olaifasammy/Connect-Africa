import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { AddToReadingHistoryCommand } from '../commands/AddToReadingHistoryCommand';
import { IReadingHistoryRepository } from '../../../auth/domain/repositories/IReadingHistoryRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class AddToReadingHistoryCommandHandler implements ICommandHandler<AddToReadingHistoryCommand, void> {
    private repository;
    private eventBus;
    constructor(repository: IReadingHistoryRepository, eventBus: EventBus);
    handle(command: AddToReadingHistoryCommand): Promise<void>;
}
