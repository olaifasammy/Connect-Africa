import { ValueObject } from '@shared/domain/ValueObject';

interface UserProfileIdProps {
  value: string;
}

export class UserProfileId extends ValueObject<UserProfileIdProps> {
  private constructor(props: UserProfileIdProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(value: string): UserProfileId {
    return new UserProfileId({ value });
  }
}
