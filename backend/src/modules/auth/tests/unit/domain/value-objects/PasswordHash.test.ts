import { PasswordHash } from '../../../../domain/value-objects/PasswordHash';

describe('PasswordHash Value Object', () => {
  it('should create a valid password hash', () => {
    const hash = 'hashed_password_example';
    const passwordHash = new PasswordHash(hash);
    expect(passwordHash.value).toBe(hash);
  });
});
