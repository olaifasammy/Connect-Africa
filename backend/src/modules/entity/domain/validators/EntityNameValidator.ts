export class EntityNameValidator {
  static validate(name: string): boolean {
    return name.length >= 1 && name.length <= 255;
  }
}
