import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
@provide(ThemeService, true)
@injectable()
export class ThemeService {
  validateTheme(theme: string): boolean {
    return ['light', 'dark'].includes(theme);
  }
}
