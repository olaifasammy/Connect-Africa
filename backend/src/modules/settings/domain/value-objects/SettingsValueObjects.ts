import { ValueObject } from '@shared/domain/ValueObject';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface ValueProps {
  value: string;
}

export class Theme extends ValueObject<ValueProps> {
  static readonly LIGHT = 'light';
  static readonly DARK = 'dark';
  constructor(value: string) {
    if (![Theme.LIGHT, Theme.DARK].includes(value)) {
      throw new Error(`Invalid theme: ${value}`);
    }
    super({ value });
  }
  toString(): string { return this.props.value; }
}

export class Timezone extends ValueObject<ValueProps> {
  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('Timezone cannot be empty');
    }
    super({ value });
  }
  toString(): string { return this.props.value; }
}

export class Locale extends ValueObject<ValueProps> {
  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('Locale cannot be empty');
    }
    super({ value });
  }
  toString(): string { return this.props.value; }
}

export class DateFormat extends ValueObject<ValueProps> {
  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('DateFormat cannot be empty');
    }
    super({ value });
  }
  toString(): string { return this.props.value; }
}

export class Currency extends ValueObject<ValueProps> {
  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('Currency cannot be empty');
    }
    super({ value });
  }
  toString(): string { return this.props.value; }
}

export class MeasurementUnit extends ValueObject<ValueProps> {
  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('MeasurementUnit cannot be empty');
    }
    super({ value });
  }
  toString(): string { return this.props.value; }
}

export class NotificationPreference extends ValueObject<ValueProps> {
  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('NotificationPreference cannot be empty');
    }
    super({ value });
  }
  toString(): string { return this.props.value; }
}

export class PrivacyLevel extends ValueObject<ValueProps> {
  static readonly PUBLIC = 'public';
  static readonly PRIVATE = 'private';
  constructor(value: string) {
    if (![PrivacyLevel.PUBLIC, PrivacyLevel.PRIVATE].includes(value)) {
      throw new Error(`Invalid privacy level: ${value}`);
    }
    super({ value });
  }
  toString(): string { return this.props.value; }
}

export class SettingsProfileId extends UniqueEntityId {}
