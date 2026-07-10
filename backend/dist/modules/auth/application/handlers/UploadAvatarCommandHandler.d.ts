import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { UploadAvatarCommand } from '../commands/UploadAvatarCommand';
import { IUserProfileRepository } from '../../../auth/domain/repositories/IUserProfileRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class UploadAvatarCommandHandler implements ICommandHandler<UploadAvatarCommand, void> {
    private profileRepository;
    private eventBus;
    constructor(profileRepository: IUserProfileRepository, eventBus: EventBus);
    handle(command: UploadAvatarCommand): Promise<void>;
}
