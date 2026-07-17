import { PostgresSettingsRepository } from '@modules/settings/infrastructure/PostgresSettingsRepository';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { CacheProvider } from '@shared/infrastructure/cache/CacheProvider';
import { Settings } from '@modules/settings/domain/entities/Settings';
import { ThemeSettings } from '@modules/settings/domain/entities/ThemeSettings';
import { Theme, NotificationPreference, PrivacyLevel, Locale, Timezone } from '@modules/settings/domain/value-objects/SettingsValueObjects';
import { NotificationSettings } from '@modules/settings/domain/entities/NotificationSettings';
import { PrivacySettings } from '@modules/settings/domain/entities/PrivacySettings';
import { LanguageSettings } from '@modules/settings/domain/entities/LanguageSettings';
import { SecuritySettings } from '@modules/settings/domain/entities/SecuritySettings';

describe('PostgresSettingsRepository Integration', () => {
  let repository: PostgresSettingsRepository;
  let postgresProvider: jest.Mocked<PostgresProvider>;
  let cacheProvider: jest.Mocked<CacheProvider>;

  beforeEach(() => {
    postgresProvider = { query: jest.fn() } as any;
    cacheProvider = { get: jest.fn(), set: jest.fn(), delete: jest.fn() } as any;
    repository = new PostgresSettingsRepository(postgresProvider, cacheProvider);
  });

  it('should save settings', async () => {
    const userId = 'user123';
    const settings = Settings.create({
      userId,
      themeSettings: ThemeSettings.create({ theme: new Theme('light') }),
      notificationSettings: NotificationSettings.create({ enabled: true, preference: new NotificationPreference('email') }),
      privacySettings: PrivacySettings.create({ level: new PrivacyLevel('public') }),
      languageSettings: LanguageSettings.create({ locale: new Locale('en-US'), timezone: new Timezone('UTC') }),
      securitySettings: SecuritySettings.create({ mfaEnabled: false }),
      preferenceSettings: []
    });

    postgresProvider.query.mockResolvedValue({ rows: [] } as any);
    await repository.save(settings);

    expect(postgresProvider.query).toHaveBeenCalled();
  });
});
