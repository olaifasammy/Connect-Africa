import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Theme, Timezone, Locale } from '../value-objects/SettingsValueObjects';
import { SettingsUpdatedEvent } from '../events/SettingsEvents';

interface SettingsProps {
  userId: string;
  theme: Theme;
  timezone: Timezone;
  locale: Locale;
}

export class Settings extends AggregateRoot<SettingsProps> {
  constructor(props: SettingsProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get userId(): string { return this.props.userId; }
  get theme(): Theme { return this.props.theme; }
  get timezone(): Timezone { return this.props.timezone; }
  get locale(): Locale { return this.props.locale; }

  updateTheme(theme: Theme): void {
    this.props.theme = theme;
    this.addDomainEvent(new SettingsUpdatedEvent(this.id, 'theme', theme.toString()));
  }
}
