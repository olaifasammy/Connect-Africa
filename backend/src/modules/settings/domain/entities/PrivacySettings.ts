import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PrivacyLevel } from '../value-objects/SettingsValueObjects';

interface PrivacySettingsProps {
  level: PrivacyLevel;
}

export class PrivacySettings extends Entity<PrivacySettingsProps> {
  private constructor(props: PrivacySettingsProps, id?: UniqueEntityId) {
    super(props, id || new UniqueEntityId());
  }

  static create(props: PrivacySettingsProps, id?: UniqueEntityId): PrivacySettings {
    return new PrivacySettings(props, id);
  }

  get level(): PrivacyLevel { return this.props.level; }

  updateLevel(level: PrivacyLevel): void {
    this.props.level = level;
  }
}
