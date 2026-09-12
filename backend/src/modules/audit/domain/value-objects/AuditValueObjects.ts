import { ValueObject } from '@shared/domain/ValueObject';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class AuditId extends UniqueEntityId {}
export class UserId extends UniqueEntityId {}
export class ResourceId extends UniqueEntityId {}

interface ValueProps {
  value: string;
}

export class CorrelationId extends ValueObject<ValueProps> {
  constructor(value: string) {
    if (!value) throw new Error('CorrelationId cannot be empty');
    super({ value });
  }
}

export class IPAddress extends ValueObject<ValueProps> {
  constructor(value: string) {
    // Basic IP validation
    if (!/^(?:\d{1,3}\.){3}\d{1,3}$/.test(value)) throw new Error('Invalid IP address');
    super({ value });
  }
}

export class UserAgent extends ValueObject<ValueProps> {
  constructor(value: string) {
    if (!value) throw new Error('UserAgent cannot be empty');
    super({ value });
  }
}

export class Timestamp extends ValueObject<{ value: Date }> {
  constructor(value: Date) {
    super({ value });
  }
}
