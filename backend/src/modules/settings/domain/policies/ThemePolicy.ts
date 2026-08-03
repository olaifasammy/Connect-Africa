export class ThemePolicy {
  static canChangeTheme(theme: string): boolean {
    return ['light', 'dark'].includes(theme);
  }
}
