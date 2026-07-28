import { Result, Success, Failure } from '../../../../shared/utils/Result';

export class PasswordValidator {
  validate(password: string): Result<void, Error> {
    // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (passwordRegex.test(password)) {
      return new Success(undefined);
    }
    return new Failure(new Error('Password does not meet complexity requirements'));
  }
}
