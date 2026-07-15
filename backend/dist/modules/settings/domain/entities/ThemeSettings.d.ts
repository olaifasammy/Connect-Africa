import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { Theme } from '../value-objects/SettingsValueObjects';
interface ThemeSettingsProps {
    theme: Theme;
}
export declare class ThemeSettings extends Entity<ThemeSettingsProps> {
    constructor(props: ThemeSettingsProps, id?: UniqueEntityId);
}
export {};
