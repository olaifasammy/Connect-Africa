import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { UpdateUserSettingsCommand } from '../commands/UpdateUserSettingsCommand';
import { IUserSettingsRepository } from '../../../auth/domain/repositories/IUserSettingsRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class UpdateUserSettingsCommandHandler implements ICommandHandler<UpdateUserSettingsCommand, void> {
    private settingsRepository;
    private eventBus;
    constructor(settingsRepository: IUserSettingsRepository, eventBus: EventBus);
    handle(command: UpdateUserSettingsCommand): Promise<void>;
}
