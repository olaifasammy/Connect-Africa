import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { SettingsResponseDto } from '../dto/SettingsDTOs';

export class GetSettingsHandler {
  constructor(private readonly repository: ISettingsRepository) {}

  async handle(userId: string): Promise<SettingsResponseDto | null> {
    const settings = await this.repository.findById(userId);
    if (!settings) return null;

    return {
      userId: settings.userId,
      theme: settings.themeSettings.theme.toString(),
      timezone: settings.languageSettings.timezone.toString(),
      locale: settings.languageSettings.locale.toString(),
    };
  }
}
