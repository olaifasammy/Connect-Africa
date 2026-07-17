import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Theme } from '../value-objects/SettingsValueObjects';

interface ThemeSettingsProps {
  theme: Theme;
}

export class ThemeSettings extends Entity<ThemeSettingsProps> {
  private constructor(props: ThemeSettingsProps, id?: UniqueEntityId) {
    super(props, id || new UniqueEntityId());
  }

  static create(props: ThemeSettingsProps, id?: UniqueEntityId): ThemeSettings {
    return new ThemeSettings(props, id);
  }

  get theme(): Theme {
    return this.props.theme;
  }

  update(theme: Theme): void {
    this.props.theme = theme;
  }
}
