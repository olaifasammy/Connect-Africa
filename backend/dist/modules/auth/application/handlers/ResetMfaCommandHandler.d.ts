import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { ResetMfaCommand } from '../commands/ResetMfaCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class ResetMfaCommandHandler implements ICommandHandler<ResetMfaCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: ResetMfaCommand): Promise<void>;
}
