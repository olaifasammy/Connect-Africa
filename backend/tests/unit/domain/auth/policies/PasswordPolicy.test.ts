import { PasswordPolicy } from '@modules/auth/domain/policies/PasswordPolicy';

describe('PasswordPolicy', () => {
  it('should accept strong password', () => {
    expect(PasswordPolicy.isStrong('StrongPass1!')).toBe(true);
  });

  it('should reject short password', () => {
    expect(PasswordPolicy.isStrong('Short1!')).toBe(false);
  });

  it('should reject password missing special char', () => {
    expect(PasswordPolicy.isStrong('StrongPassword1')).toBe(false);
  });
});
