import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { ThemeSettings } from './ThemeSettings';
import { NotificationSettings } from './NotificationSettings';
import { PrivacySettings } from './PrivacySettings';
import { LanguageSettings } from './LanguageSettings';
import { SecuritySettings } from './SecuritySettings';
import { PreferenceSettings } from './PreferenceSettings';
import { SettingsUpdatedEvent } from '../events/SettingsEvents';
import { Theme, Locale, Timezone, PrivacyLevel, NotificationPreference } from '../value-objects/SettingsValueObjects';

interface SettingsProps {
  userId: string;
  themeSettings: ThemeSettings;
  notificationSettings: NotificationSettings;
  privacySettings: PrivacySettings;
  languageSettings: LanguageSettings;
  securitySettings: SecuritySettings;
  preferenceSettings: PreferenceSettings[];
}

export class Settings extends AggregateRoot<SettingsProps> {
  private constructor(props: SettingsProps, id?: UniqueEntityId) {
    super(props, id || new UniqueEntityId());
  }

  static create(props: SettingsProps, id?: UniqueEntityId): Settings {
    return new Settings(props, id);
  }

  get userId(): string { return this.props.userId; }
  get themeSettings(): ThemeSettings { return this.props.themeSettings; }
  get notificationSettings(): NotificationSettings { return this.props.notificationSettings; }
  get privacySettings(): PrivacySettings { return this.props.privacySettings; }
  get languageSettings(): LanguageSettings { return this.props.languageSettings; }
  get securitySettings(): SecuritySettings { return this.props.securitySettings; }
  get preferenceSettings(): PreferenceSettings[] { return this.props.preferenceSettings; }

  updateTheme(theme: ThemeSettings): void {
    this.props.themeSettings = theme;
    this.addDomainEvent(new SettingsUpdatedEvent(this.id, 'theme', theme.theme.toString()));
  }

  updateLanguage(locale: Locale): void {
    this.props.languageSettings.updateLocale(locale);
    this.addDomainEvent(new SettingsUpdatedEvent(this.id, 'locale', locale.toString()));
  }

  updateTimezone(timezone: Timezone): void {
    this.props.languageSettings.updateTimezone(timezone);
    this.addDomainEvent(new SettingsUpdatedEvent(this.id, 'timezone', timezone.toString()));
  }

  reset(): void {
    this.props.themeSettings = ThemeSettings.create({ theme: new Theme('light') });
    this.props.notificationSettings = NotificationSettings.create({ 
        enabled: true, 
        preference: new NotificationPreference('email') 
    });
    this.props.privacySettings = PrivacySettings.create({ level: new PrivacyLevel('public') });
    this.props.languageSettings = LanguageSettings.create({ locale: new Locale('en'), timezone: new Timezone('UTC') });
    this.props.securitySettings = SecuritySettings.create({ mfaEnabled: false });
    this.props.preferenceSettings = [];
    this.addDomainEvent(new SettingsUpdatedEvent(this.id, 'all', 'reset'));
  }
}
