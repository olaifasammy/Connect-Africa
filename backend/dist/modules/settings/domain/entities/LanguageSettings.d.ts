import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { Locale } from '../value-objects/SettingsValueObjects';
interface LanguageSettingsProps {
    locale: Locale;
}
export declare class LanguageSettings extends Entity<LanguageSettingsProps> {
    constructor(props: LanguageSettingsProps, id?: UniqueEntityId);
}
export {};
