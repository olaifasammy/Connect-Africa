import { Timezone } from '../value-objects/SettingsValueObjects';

export class TimezoneValidator {
  static validate(timezone: string): void {
    new Timezone(timezone);
  }
}
