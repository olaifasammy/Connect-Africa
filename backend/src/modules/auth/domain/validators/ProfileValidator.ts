import { Result, Success, Failure } from '../../../../shared/utils/Result';

export class ProfileValidator {
  validate(bio: string): Result<void, Error> {
    if (bio.length <= 500) {
      return new Success(undefined);
    }
    return new Failure(new Error('Bio must be less than 500 characters'));
  }
}
