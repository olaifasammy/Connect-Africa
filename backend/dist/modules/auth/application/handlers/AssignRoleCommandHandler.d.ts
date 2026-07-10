import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { AssignRoleCommand } from '../commands/AssignRoleCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class AssignRoleCommandHandler implements ICommandHandler<AssignRoleCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: AssignRoleCommand): Promise<void>;
}
