import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { ThemeSettings } from './ThemeSettings';
import { NotificationSettings } from './NotificationSettings';
import { PrivacySettings } from './PrivacySettings';
import { LanguageSettings } from './LanguageSettings';
import { SecuritySettings } from './SecuritySettings';
import { PreferenceSettings } from './PreferenceSettings';
import { Locale, Timezone } from '../value-objects/SettingsValueObjects';
interface SettingsProps {
    userId: string;
    themeSettings: ThemeSettings;
    notificationSettings: NotificationSettings;
    privacySettings: PrivacySettings;
    languageSettings: LanguageSettings;
    securitySettings: SecuritySettings;
    preferenceSettings: PreferenceSettings[];
}
export declare class Settings extends AggregateRoot<SettingsProps> {
    private constructor();
    static create(props: SettingsProps, id?: UniqueEntityId): Settings;
    get userId(): string;
    get themeSettings(): ThemeSettings;
    get notificationSettings(): NotificationSettings;
    get privacySettings(): PrivacySettings;
    get languageSettings(): LanguageSettings;
    get securitySettings(): SecuritySettings;
    get preferenceSettings(): PreferenceSettings[];
    updateTheme(theme: ThemeSettings): void;
    updateLanguage(locale: Locale): void;
    updateTimezone(timezone: Timezone): void;
}
export {};
