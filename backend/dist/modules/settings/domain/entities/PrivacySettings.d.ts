import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { PrivacyLevel } from '../value-objects/SettingsValueObjects';
interface PrivacySettingsProps {
    level: PrivacyLevel;
}
export declare class PrivacySettings extends Entity<PrivacySettingsProps> {
    private constructor();
    static create(props: PrivacySettingsProps, id?: UniqueEntityId): PrivacySettings;
    get level(): PrivacyLevel;
    updateLevel(level: PrivacyLevel): void;
}
export {};
