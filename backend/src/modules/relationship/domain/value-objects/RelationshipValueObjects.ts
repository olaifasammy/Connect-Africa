import { ValueObject } from '@shared/domain/ValueObject';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RelationshipId extends UniqueEntityId {
  constructor(value?: string) {
    super(value);
  }
}

export class EntityId extends ValueObject<{ value: string }> {
  constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }
}

export class SourceEntityId extends EntityId {}
export class TargetEntityId extends EntityId {}

export class RelationshipTypeId extends ValueObject<{ value: string }> {
  constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }
}

export class RelationshipStatus extends ValueObject<{ value: string }> {
  constructor(value: string) {
    super({ value });
  }
  static create(value: string): RelationshipStatus {
    return new RelationshipStatus(value);
  }
}

export class ConfidenceScore extends ValueObject<{ value: number }> {
  constructor(value: number) {
    if (value < 0 || value > 1) {
      throw new Error('ConfidenceScore must be between 0 and 1');
    }
    super({ value });
  }
}

export class VersionNumber extends ValueObject<{ value: number }> {
  constructor(value: number) {
    super({ value });
  }
}

export class ValidTimeRange extends ValueObject<{ start: Date; end?: Date }> {
  constructor(props: { start: Date; end?: Date }) {
    if (props.end && props.start > props.end) {
      throw new Error('Start date cannot be after end date');
    }
    super(props);
  }
}

export class Metadata extends ValueObject<{ value: Record<string, any> }> {
  constructor(value: Record<string, any>) {
    super({ value });
  }
}
