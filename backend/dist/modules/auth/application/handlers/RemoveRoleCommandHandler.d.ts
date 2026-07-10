import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { RemoveRoleCommand } from '../commands/RemoveRoleCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class RemoveRoleCommandHandler implements ICommandHandler<RemoveRoleCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: RemoveRoleCommand): Promise<void>;
}
