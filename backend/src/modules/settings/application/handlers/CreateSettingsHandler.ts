import { CreateSettingsCommand } from '../commands/SettingsCommands';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { Settings } from '../../domain/entities/Settings';
import { Theme, Timezone, Locale } from '../../domain/value-objects/SettingsValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class CreateSettingsHandler {
  constructor(private readonly settingsRepository: ISettingsRepository) {}

  async handle(command: CreateSettingsCommand): Promise<void> {
    const settings = new Settings({
        userId: command.userId,
        theme: new Theme(command.theme),
        timezone: new Timezone(command.timezone),
        locale: new Locale(command.locale)
    }, new UniqueEntityId(command.userId));
    
    await this.settingsRepository.save(settings);
  }
}
