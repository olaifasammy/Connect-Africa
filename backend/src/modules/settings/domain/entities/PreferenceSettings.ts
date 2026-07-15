import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface PreferenceSettingsProps {
  key: string;
  value: string;
}

export class PreferenceSettings extends Entity<PreferenceSettingsProps> {
  constructor(props: PreferenceSettingsProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
