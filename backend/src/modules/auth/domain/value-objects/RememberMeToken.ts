import { ValueObject } from '@shared/domain/ValueObject';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface RememberMeTokenProps {
  value: string;
  userId: string;
  expiresAt: Date;
}

export class RememberMeToken extends ValueObject<RememberMeTokenProps> {
  private constructor(props: RememberMeTokenProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(userId: string, expiresAt: Date): RememberMeToken {
    return new RememberMeToken({
      value: new UniqueEntityId().toString(),
      userId,
      expiresAt,
    });
  }
}
