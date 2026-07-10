import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { UpdateUserCommand } from '../commands/UpdateUserCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
export declare class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand, void> {
    private userRepository;
    constructor(userRepository: IUserRepository);
    handle(command: UpdateUserCommand): Promise<void>;
}
