import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PrivacyLevel } from '../value-objects/SettingsValueObjects';

interface PrivacySettingsProps {
  level: PrivacyLevel;
}

export class PrivacySettings extends Entity<PrivacySettingsProps> {
  constructor(props: PrivacySettingsProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
