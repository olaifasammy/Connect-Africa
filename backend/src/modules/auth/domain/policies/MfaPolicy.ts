export class MfaPolicy {
  static canEnableMfa(isAlreadyEnabled: boolean): boolean {
    return !isAlreadyEnabled;
  }

  static canDisableMfa(isAlreadyEnabled: boolean): boolean {
    return isAlreadyEnabled;
  }
}
