import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface SystemSettingsProps {
    maintenanceMode: boolean;
    registrationEnabled: boolean;
    updatedAt: Date;
}
export declare class SystemSettings extends AggregateRoot<SystemSettingsProps> {
    private constructor();
    static create(props: SystemSettingsProps, id?: UniqueEntityId): SystemSettings;
}
export {};
