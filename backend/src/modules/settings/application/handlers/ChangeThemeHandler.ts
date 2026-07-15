import { ChangeThemeCommand } from '../commands/ChangeThemeCommand';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { Theme } from '../../domain/value-objects/SettingsValueObjects';

export class ChangeThemeHandler {
  constructor(private readonly settingsRepository: ISettingsRepository) {}

  async handle(command: ChangeThemeCommand): Promise<void> {
    const settings = await this.settingsRepository.findById(command.userId);
    if (!settings) throw new Error('Settings not found');
    
    settings.updateTheme(new Theme(command.theme));
    await this.settingsRepository.save(settings);
  }
}
