import { ValueObject } from '@shared/domain/ValueObject';

interface UserIdProps {
  value: string;
}

export class UserId extends ValueObject<UserIdProps> {
  private constructor(props: UserIdProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(value: string): UserId {
    return new UserId({ value });
  }
}
