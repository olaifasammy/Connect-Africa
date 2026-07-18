import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface OrganizationSettingsProps {
    organizationId: string;
    allowedDomains: string[];
    updatedAt: Date;
}
export declare class OrganizationSettings extends AggregateRoot<OrganizationSettingsProps> {
    private constructor();
    static create(props: OrganizationSettingsProps, id?: UniqueEntityId): OrganizationSettings;
}
export {};
