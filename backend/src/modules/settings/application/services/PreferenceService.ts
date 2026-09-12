import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
@provide(PreferenceService, true)
@injectable()
export class PreferenceService {
  validatePreference(key: string, value: string): boolean {
    return key !== '' && value !== '';
  }
}
