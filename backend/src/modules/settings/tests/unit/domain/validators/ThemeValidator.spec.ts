import { ThemeValidator } from '@modules/settings/domain/validators/ThemeValidator';

describe('ThemeValidator', () => {
  it('should not throw for valid theme', () => {
    expect(() => ThemeValidator.validate('light')).not.toThrow();
  });

  it('should throw for invalid theme', () => {
    expect(() => ThemeValidator.validate('invalid')).toThrow();
  });
});
