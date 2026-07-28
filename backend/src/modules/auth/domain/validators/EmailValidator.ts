import { Result, Success, Failure } from '../../../../shared/utils/Result';

export class EmailValidator {
  validate(email: string): Result<void, Error> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      return new Success(undefined);
    }
    return new Failure(new Error('Invalid email format'));
  }
}
