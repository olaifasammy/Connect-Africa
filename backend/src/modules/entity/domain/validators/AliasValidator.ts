export class AliasValidator {
  static validate(alias: string): boolean {
    return alias.length >= 1 && alias.length <= 100;
  }
}
