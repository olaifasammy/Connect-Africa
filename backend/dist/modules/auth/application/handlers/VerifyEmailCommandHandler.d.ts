import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { VerifyEmailCommand } from '../commands/VerifyEmailCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class VerifyEmailCommandHandler implements ICommandHandler<VerifyEmailCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: VerifyEmailCommand): Promise<void>;
}
