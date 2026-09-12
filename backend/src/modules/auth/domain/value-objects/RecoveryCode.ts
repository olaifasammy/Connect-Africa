import { ValueObject } from '@shared/domain/ValueObject';
import * as bcrypt from 'bcryptjs';

interface RecoveryCodeProps {
  hash: string;
}

export class RecoveryCode extends ValueObject<RecoveryCodeProps> {
  constructor(hash: string) {
    super({ hash });
  }

  get hash(): string {
    return this.props.hash;
  }
}
