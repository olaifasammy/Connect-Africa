import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface SecuritySettingsProps {
    mfaEnabled: boolean;
}
export declare class SecuritySettings extends Entity<SecuritySettingsProps> {
    private constructor();
    static create(props: SecuritySettingsProps, id?: UniqueEntityId): SecuritySettings;
    get mfaEnabled(): boolean;
    enableMfa(): void;
    disableMfa(): void;
}
export {};
