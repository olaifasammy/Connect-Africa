export class PasswordPolicy {
  static isStrong(password: string): boolean {
    // Requirements: Minimum 10 chars, at least one number, one special char
    const minLength = 10;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && hasNumber && hasSpecial;
  }
}
