export class TimezoneValidator {
  static validate(timezone: string): boolean {
    return timezone.length > 0;
  }
}
