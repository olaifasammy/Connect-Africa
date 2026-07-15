import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Theme } from '../value-objects/SettingsValueObjects';

interface ThemeSettingsProps {
  theme: Theme;
}

export class ThemeSettings extends Entity<ThemeSettingsProps> {
  constructor(props: ThemeSettingsProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
