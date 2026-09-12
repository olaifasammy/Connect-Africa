import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface PreferenceSettingsProps {
  key: string;
  value: string;
}

export class PreferenceSettings extends Entity<PreferenceSettingsProps> {
  private constructor(props: PreferenceSettingsProps, id?: UniqueEntityId) {
    super(props, id || new UniqueEntityId());
  }

  static create(props: PreferenceSettingsProps, id?: UniqueEntityId): PreferenceSettings {
    return new PreferenceSettings(props, id);
  }

  get key(): string { return this.props.key; }
  get value(): string { return this.props.value; }

  updateValue(value: string): void {
    this.props.value = value;
  }
}
