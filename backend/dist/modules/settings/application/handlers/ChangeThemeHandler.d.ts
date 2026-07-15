import { ChangeThemeCommand } from '../commands/ChangeThemeCommand';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
export declare class ChangeThemeHandler {
    private readonly settingsRepository;
    constructor(settingsRepository: ISettingsRepository);
    handle(command: ChangeThemeCommand): Promise<void>;
}
