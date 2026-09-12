import { validate as isUuid, v4 as uuidv4 } from 'uuid';

import { ValueObject } from '@shared/domain/ValueObject';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { RelationshipValidationError } from '../errors/RelationshipErrors';

function validateRequiredString(
  value: string,
  fieldName: string,
): void {
  if (
    typeof value !== 'string' ||
    value.trim().length === 0
  ) {
    throw new RelationshipValidationError(
      `${fieldName} must be a non-empty string.`,
    );
  }
}

function validateUuid(
  value: string,
  fieldName: string,
): void {
  validateRequiredString(value, fieldName);

  if (!isUuid(value)) {
    throw new RelationshipValidationError(
      `${fieldName} must be a valid UUID.`,
    );
  }
}

export class RelationshipId extends UniqueEntityId {
  constructor(value?: string) {
    const id = value ?? uuidv4();

    validateUuid(id, 'Relationship ID');

    super(id);
  }
}

export class EntityId extends ValueObject<{ value: string }> {
  constructor(value: string) {
    validateUuid(value, 'Entity ID');
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }
}

export class SourceEntityId extends EntityId {}

export class TargetEntityId extends EntityId {}

export class RelationshipTypeId
  extends ValueObject<{ value: string }>
{
  constructor(value: string) {
    validateUuid(value, 'Relationship type ID');
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }
}

export class RelationshipStatus
  extends ValueObject<{ value: string }>
{
  constructor(value: string) {
    validateRequiredString(value, 'Relationship status');
    super({ value: value.trim() });
  }

  static create(value: string): RelationshipStatus {
    return new RelationshipStatus(value);
  }

  get value(): string {
    return this.props.value;
  }
}

export class ConfidenceScore
  extends ValueObject<{ value: number }>
{
  constructor(value: number) {
    if (
      typeof value !== 'number' ||
      !Number.isFinite(value) ||
      value < 0 ||
      value > 1
    ) {
      throw new RelationshipValidationError(
        'Confidence score must be a finite number between 0 and 1.',
      );
    }

    super({ value });
  }

  get value(): number {
    return this.props.value;
  }
}

export class ValidTimeRange
  extends ValueObject<{ start: Date; end?: Date }>
{
  constructor(props: { start: Date; end?: Date }) {
    if (!(props.start instanceof Date) || Number.isNaN(props.start.getTime())) {
      throw new RelationshipValidationError(
        'Valid time range start must be a valid date.',
      );
    }

    if (
      props.end !== undefined &&
      (
        !(props.end instanceof Date) ||
        Number.isNaN(props.end.getTime())
      )
    ) {
      throw new RelationshipValidationError(
        'Valid time range end must be a valid date.',
      );
    }

    if (
      props.end !== undefined &&
      props.start.getTime() > props.end.getTime()
    ) {
      throw new RelationshipValidationError(
        'Valid time range start cannot be after end.',
      );
    }

    super({
      start: new Date(props.start.getTime()),
      end:
        props.end === undefined
          ? undefined
          : new Date(props.end.getTime()),
    });
  }

  get start(): Date {
    return new Date(this.props.start.getTime());
  }

  get end(): Date | undefined {
    return this.props.end === undefined
      ? undefined
      : new Date(this.props.end.getTime());
  }
}

export type MetadataValue =
  | string
  | number
  | boolean
  | null
  | MetadataValue[]
  | { [key: string]: MetadataValue };

export class Metadata
  extends ValueObject<{ value: Record<string, MetadataValue> }>
{
  constructor(value: Record<string, MetadataValue>) {
    if (
      value === null ||
      typeof value !== 'object' ||
      Array.isArray(value)
    ) {
      throw new RelationshipValidationError(
        'Metadata must be a plain object.',
      );
    }

    super({
      value: Metadata.cloneAndFreeze(value),
    });
  }

  get value(): Record<string, MetadataValue> {
    return Metadata.cloneAndFreeze(this.props.value);
  }

  private static cloneAndFreeze<T>(value: T): T {
    if (Array.isArray(value)) {
      const cloned = value.map((item) =>
        Metadata.cloneAndFreeze(item),
      );

      return Object.freeze(cloned) as T;
    }

    if (
      value !== null &&
      typeof value === 'object'
    ) {
      const cloned: Record<string, unknown> = {};

      for (const [key, nestedValue] of Object.entries(
        value as Record<string, unknown>,
      )) {
        cloned[key] = Metadata.cloneAndFreeze(nestedValue);
      }

      return Object.freeze(cloned) as T;
    }

    return value;
  }
}