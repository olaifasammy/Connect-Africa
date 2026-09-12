import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { SettingsResponseDto } from '../dto/SettingsDTOs';

@provide(GetSettingsHandler, true)
@injectable()
export class GetSettingsHandler {
  constructor(@inject('ISettingsRepository') private readonly repository: ISettingsRepository) {}

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
