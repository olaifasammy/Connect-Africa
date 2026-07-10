import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { ChangeEmailCommand } from '../commands/ChangeEmailCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class ChangeEmailCommandHandler implements ICommandHandler<ChangeEmailCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: ChangeEmailCommand): Promise<void>;
}
