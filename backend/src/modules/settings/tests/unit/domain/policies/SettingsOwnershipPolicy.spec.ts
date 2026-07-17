import { SettingsOwnershipPolicy } from '@modules/settings/domain/policies/SettingsOwnershipPolicy';
import { Settings } from '@modules/settings/domain/entities/Settings';
import { ThemeSettings } from '@modules/settings/domain/entities/ThemeSettings';
import { Theme, NotificationPreference, PrivacyLevel, Locale, Timezone } from '@modules/settings/domain/value-objects/SettingsValueObjects';
import { NotificationSettings } from '@modules/settings/domain/entities/NotificationSettings';
import { PrivacySettings } from '@modules/settings/domain/entities/PrivacySettings';
import { LanguageSettings } from '@modules/settings/domain/entities/LanguageSettings';
import { SecuritySettings } from '@modules/settings/domain/entities/SecuritySettings';

describe('SettingsOwnershipPolicy', () => {
  it('should return true for owner', () => {
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
    expect(SettingsOwnershipPolicy.isOwner(settings, userId)).toBe(true);
  });
});
