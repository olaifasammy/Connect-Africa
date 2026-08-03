export class ThemeService {
  validateTheme(theme: string): boolean {
    return ['light', 'dark'].includes(theme);
  }
}
