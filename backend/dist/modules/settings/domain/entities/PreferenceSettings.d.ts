import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface PreferenceSettingsProps {
    key: string;
    value: string;
}
export declare class PreferenceSettings extends Entity<PreferenceSettingsProps> {
    private constructor();
    static create(props: PreferenceSettingsProps, id?: UniqueEntityId): PreferenceSettings;
    get key(): string;
    get value(): string;
    updateValue(value: string): void;
}
export {};
