import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { UpdateProfileCommand } from '../commands/UpdateProfileCommand';
import { IUserProfileRepository } from '../../../auth/domain/repositories/IUserProfileRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class UpdateProfileCommandHandler implements ICommandHandler<UpdateProfileCommand, void> {
    private profileRepository;
    private eventBus;
    constructor(profileRepository: IUserProfileRepository, eventBus: EventBus);
    handle(command: UpdateProfileCommand): Promise<void>;
}
