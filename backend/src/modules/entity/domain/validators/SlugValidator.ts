export class SlugValidator {
  static validate(slug: string): boolean {
    return /^[a-z0-9-]+$/.test(slug);
  }
}
