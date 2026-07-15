import { CreateSettingsCommand } from '../commands/SettingsCommands';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
export declare class CreateSettingsHandler {
    private readonly settingsRepository;
    constructor(settingsRepository: ISettingsRepository);
    handle(command: CreateSettingsCommand): Promise<void>;
}
