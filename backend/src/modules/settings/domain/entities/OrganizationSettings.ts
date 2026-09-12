import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface OrganizationSettingsProps {
  organizationId: string;
  allowedDomains: string[];
  updatedAt: Date;
}

export class OrganizationSettings extends AggregateRoot<OrganizationSettingsProps> {
  private constructor(props: OrganizationSettingsProps, id?: UniqueEntityId) {
    super(props, id || new UniqueEntityId());
  }

  static create(props: OrganizationSettingsProps, id?: UniqueEntityId): OrganizationSettings {
    return new OrganizationSettings(props, id);
  }
}
