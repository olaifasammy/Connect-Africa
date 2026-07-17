import { ChangeThemeHandler } from '@modules/settings/application/handlers/ChangeThemeHandler';
import { ChangeThemeCommand } from '@modules/settings/application/commands/ChangeThemeCommand';
import { ISettingsRepository } from '@modules/settings/domain/repositories/ISettingsRepository';
import { Settings } from '@modules/settings/domain/entities/Settings';
import { ThemeSettings } from '@modules/settings/domain/entities/ThemeSettings';
import { Theme, NotificationPreference, PrivacyLevel, Locale, Timezone } from '@modules/settings/domain/value-objects/SettingsValueObjects';
import { NotificationSettings } from '@modules/settings/domain/entities/NotificationSettings';
import { PrivacySettings } from '@modules/settings/domain/entities/PrivacySettings';
import { LanguageSettings } from '@modules/settings/domain/entities/LanguageSettings';
import { SecuritySettings } from '@modules/settings/domain/entities/SecuritySettings';
import { IAuditLogger } from '@modules/auth/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

describe('ChangeThemeHandler Integration', () => {
  let handler: ChangeThemeHandler;
  let settingsRepository: jest.Mocked<ISettingsRepository>;
  let auditLogger: jest.Mocked<IAuditLogger>;
  let eventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    settingsRepository = { findById: jest.fn(), save: jest.fn() };
    auditLogger = { log: jest.fn() };
    eventBus = { publish: jest.fn(), subscribe: jest.fn() } as any;
    handler = new ChangeThemeHandler(settingsRepository, auditLogger, eventBus);
  });

  it('should change theme', async () => {
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

    await handler.handle(new ChangeThemeCommand(userId, 'dark'));
    expect(settingsRepository.save).toHaveBeenCalled();
    expect(auditLogger.log).toHaveBeenCalled();
    expect(eventBus.publish).toHaveBeenCalled();
  });
});
