export class PreferenceService {
  validatePreference(key: string, value: string): boolean {
    return key !== '' && value !== '';
  }
}
