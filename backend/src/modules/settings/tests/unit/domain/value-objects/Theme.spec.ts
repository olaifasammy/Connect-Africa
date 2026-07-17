import { Theme } from '@modules/settings/domain/value-objects/SettingsValueObjects';

describe('Theme ValueObject', () => {
  it('should create valid theme', () => {
    const theme = new Theme('light');
    expect(theme.toString()).toBe('light');
  });

  it('should throw error for invalid theme', () => {
    expect(() => new Theme('invalid')).toThrow('Invalid theme: invalid');
  });
});
