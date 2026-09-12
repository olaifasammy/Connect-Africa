import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Locale, Timezone } from '../value-objects/SettingsValueObjects';

interface LanguageSettingsProps {
  locale: Locale;
  timezone: Timezone;
}

export class LanguageSettings extends Entity<LanguageSettingsProps> {
  private constructor(props: LanguageSettingsProps, id?: UniqueEntityId) {
    super(props, id || new UniqueEntityId());
  }

  static create(props: LanguageSettingsProps, id?: UniqueEntityId): LanguageSettings {
    return new LanguageSettings(props, id);
  }

  get locale(): Locale { return this.props.locale; }
  get timezone(): Timezone { return this.props.timezone; }

  updateLocale(locale: Locale): void {
    this.props.locale = locale;
  }
  
  updateTimezone(timezone: Timezone): void {
    this.props.timezone = timezone;
  }
}
