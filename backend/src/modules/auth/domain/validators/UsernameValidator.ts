import { Result, Success, Failure } from '../../../../shared/utils/Result';

export class UsernameValidator {
  validate(username: string): Result<void, Error> {
    // Alphanumeric, between 3 and 20 characters
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (usernameRegex.test(username)) {
      return new Success(undefined);
    }
    return new Failure(new Error('Invalid username format'));
  }
}
