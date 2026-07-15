import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class Theme extends UniqueEntityId {
  static readonly LIGHT = 'light';
  static readonly DARK = 'dark';
  constructor(value: string) {
    if (![Theme.LIGHT, Theme.DARK].includes(value)) {
      throw new Error(`Invalid theme: ${value}`);
    }
    super(value);
  }
}

export class Timezone extends UniqueEntityId {}
export class Locale extends UniqueEntityId {}
export class DateFormat extends UniqueEntityId {}
export class Currency extends UniqueEntityId {}
export class MeasurementUnit extends UniqueEntityId {}
export class NotificationPreference extends UniqueEntityId {}
export class PrivacyLevel extends UniqueEntityId {}
