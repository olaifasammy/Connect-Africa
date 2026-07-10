import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { AddBookmarkCommand } from '../commands/AddBookmarkCommand';
import { IUserBookmarkRepository } from '../../../auth/domain/repositories/IUserBookmarkRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class AddBookmarkCommandHandler implements ICommandHandler<AddBookmarkCommand, void> {
    private bookmarkRepository;
    private eventBus;
    constructor(bookmarkRepository: IUserBookmarkRepository, eventBus: EventBus);
    handle(command: AddBookmarkCommand): Promise<void>;
}
