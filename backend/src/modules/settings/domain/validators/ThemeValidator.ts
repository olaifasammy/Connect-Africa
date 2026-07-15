export class ThemeValidator {
  static validate(theme: string): boolean {
    return ['light', 'dark'].includes(theme);
  }
}
