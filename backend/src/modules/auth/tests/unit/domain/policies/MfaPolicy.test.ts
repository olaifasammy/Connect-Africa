import { MfaPolicy } from '../../../../domain/policies/MfaPolicy';

describe('MfaPolicy', () => {
  it('should allow enabling MFA if not already enabled', () => {
    expect(MfaPolicy.canEnableMfa(false)).toBe(true);
  });

  it('should not allow enabling MFA if already enabled', () => {
    expect(MfaPolicy.canEnableMfa(true)).toBe(false);
  });

  it('should allow disabling MFA if enabled', () => {
    expect(MfaPolicy.canDisableMfa(true)).toBe(true);
  });

  it('should not allow disabling MFA if not enabled', () => {
    expect(MfaPolicy.canDisableMfa(false)).toBe(false);
  });
});
