import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { Theme, Timezone, Locale } from '../value-objects/SettingsValueObjects';
interface SettingsProps {
    userId: string;
    theme: Theme;
    timezone: Timezone;
    locale: Locale;
}
export declare class Settings extends AggregateRoot<SettingsProps> {
    constructor(props: SettingsProps, id?: UniqueEntityId);
    get userId(): string;
    get theme(): Theme;
    get timezone(): Timezone;
    get locale(): Locale;
    updateTheme(theme: Theme): void;
}
export {};
