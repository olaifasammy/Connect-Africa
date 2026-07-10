import { ValueObject } from '@shared/domain/ValueObject';

interface PasswordHashProps {
  value: string;
}

export class PasswordHash extends ValueObject<PasswordHashProps> {
  constructor(hash: string) {
    super({ value: hash });
  }

  get value(): string {
    return this.props.value;
  }
}
