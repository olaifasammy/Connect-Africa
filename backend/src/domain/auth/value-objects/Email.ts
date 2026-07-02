import { ValueObject } from '@domain/shared/ValueObject';
import { InvalidEmailError } from '../errors/UserErrors';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  constructor(email: string) {
    if (!email.includes('@')) {
      throw new InvalidEmailError(email);
    }
    super({ value: email.toLowerCase() });
  }

  get value(): string {
    return this.props.value;
  }
}
