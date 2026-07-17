import { SettingsService } from '@modules/settings/application/services/SettingsService';
import { ISettingsRepository } from '@modules/settings/domain/repositories/ISettingsRepository';
import { Settings } from '@modules/settings/domain/entities/Settings';
import { ThemeSettings } from '@modules/settings/domain/entities/ThemeSettings';
import { Theme, NotificationPreference, PrivacyLevel, Locale, Timezone } from '@modules/settings/domain/value-objects/SettingsValueObjects';
import { NotificationSettings } from '@modules/settings/domain/entities/NotificationSettings';
import { PrivacySettings } from '@modules/settings/domain/entities/PrivacySettings';
import { LanguageSettings } from '@modules/settings/domain/entities/LanguageSettings';
import { SecuritySettings } from '@modules/settings/domain/entities/SecuritySettings';

describe('SettingsService', () => {
  let settingsRepository: jest.Mocked<ISettingsRepository>;
  let settingsService: SettingsService;

  beforeEach(() => {
    settingsRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    };
    settingsService = new SettingsService(settingsRepository);
  });

  it('should validate settings', async () => {
    const userId = 'user123';
    settingsRepository.findById.mockResolvedValue(Settings.create({
      userId,
      themeSettings: ThemeSettings.create({ theme: new Theme('light') }),
      notificationSettings: NotificationSettings.create({ enabled: true, preference: new NotificationPreference('email') }),
      privacySettings: PrivacySettings.create({ level: new PrivacyLevel('public') }),
      languageSettings: LanguageSettings.create({ locale: new Locale('en-US'), timezone: new Timezone('UTC') }),
      securitySettings: SecuritySettings.create({ mfaEnabled: false }),
      preferenceSettings: []
    }));

    const isValid = await settingsService.validateSettings(userId);
    expect(isValid).toBe(true);
  });
});
