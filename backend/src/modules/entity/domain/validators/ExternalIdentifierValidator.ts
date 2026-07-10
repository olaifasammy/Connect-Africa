export class ExternalIdentifierValidator {
  static validate(id: string): boolean {
    return id.length >= 1 && id.length <= 100;
  }
}
