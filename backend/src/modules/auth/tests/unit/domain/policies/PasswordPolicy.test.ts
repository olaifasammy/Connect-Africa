import { PasswordPolicy } from '../../../../domain/policies/PasswordPolicy';

describe('PasswordPolicy', () => {
  it('should return true for a valid strong password', () => {
    expect(PasswordPolicy.isStrong('StrongP@ss123')).toBe(true);
  });

  it('should return false if password is too short', () => {
    expect(PasswordPolicy.isStrong('Sh@rt1')).toBe(false);
  });

  it('should return false if password lacks a number', () => {
    expect(PasswordPolicy.isStrong('NoNumberP@ss')).toBe(false);
  });

  it('should return false if password lacks a special character', () => {
    expect(PasswordPolicy.isStrong('NoSpecial123')).toBe(false);
  });
});
