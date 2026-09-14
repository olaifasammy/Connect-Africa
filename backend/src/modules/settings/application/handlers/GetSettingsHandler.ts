import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { SettingsResponseDto } from '../dto/SettingsDTOs';

@provide(GetSettingsHandler, true)
@injectable()
export class GetSettingsHandler {
  constructor(
    @inject('ISettingsRepository')
    private readonly repository: ISettingsRepository,
  ) {}

  async handle(userId: string): Promise<SettingsResponseDto | null> {
    const settings = await this.repository.findOrCreate(userId);

    return {
      userId: settings.userId,
      theme: settings.themeSettings.theme.toString(),
      timezone: settings.languageSettings.timezone.toString(),
      locale: settings.languageSettings.locale.toString(),
      privacyLevel: settings.privacySettings.level.toString(),
      notificationsEnabled: settings.notificationSettings.enabled,
      notificationPreference:
        settings.notificationSettings.preference.toString(),
      mfaEnabled: settings.securitySettings.mfaEnabled,
    };
  }
}
