import { ValueObject } from '@domain/shared/ValueObject';

interface MfaSecretProps {
  value: string;
}

export class MfaSecret extends ValueObject<MfaSecretProps> {
  constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }
}
