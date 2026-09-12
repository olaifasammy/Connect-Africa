import { Email } from '../../../../domain/value-objects/Email';

describe('Email Value Object', () => {
  it('should create a valid email', () => {
    const email = new Email('test@example.com');
    expect(email.value).toBe('test@example.com');
  });

  it('should throw an error for invalid email', () => {
    expect(() => new Email('invalid-email')).toThrow();
  });
});
