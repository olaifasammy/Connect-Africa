import { CreateSettingsCommand } from '../commands/SettingsCommands';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { IAuditLogger } from '../../../auth/public';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class CreateSettingsHandler {
    private readonly settingsRepository;
    private readonly auditLogger;
    private readonly eventBus;
    constructor(settingsRepository: ISettingsRepository, auditLogger: IAuditLogger, eventBus: EventBus);
    handle(command: CreateSettingsCommand): Promise<void>;
}
