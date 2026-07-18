import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { Locale, Timezone } from '../value-objects/SettingsValueObjects';
interface LanguageSettingsProps {
    locale: Locale;
    timezone: Timezone;
}
export declare class LanguageSettings extends Entity<LanguageSettingsProps> {
    private constructor();
    static create(props: LanguageSettingsProps, id?: UniqueEntityId): LanguageSettings;
    get locale(): Locale;
    get timezone(): Timezone;
    updateLocale(locale: Locale): void;
    updateTimezone(timezone: Timezone): void;
}
export {};
