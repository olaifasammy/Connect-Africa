import { ChangeThemeCommand } from '../commands/ChangeThemeCommand';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { IAuditLogger } from '../../../auth/public';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class ChangeThemeHandler {
    private readonly settingsRepository;
    private readonly auditLogger;
    private readonly eventBus;
    constructor(settingsRepository: ISettingsRepository, auditLogger: IAuditLogger, eventBus: EventBus);
    handle(command: ChangeThemeCommand): Promise<void>;
}
