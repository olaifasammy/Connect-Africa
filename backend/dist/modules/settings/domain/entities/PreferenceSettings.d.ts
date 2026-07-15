import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface PreferenceSettingsProps {
    key: string;
    value: string;
}
export declare class PreferenceSettings extends Entity<PreferenceSettingsProps> {
    constructor(props: PreferenceSettingsProps, id?: UniqueEntityId);
}
export {};
