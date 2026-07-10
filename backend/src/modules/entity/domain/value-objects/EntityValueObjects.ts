import { ValueObject } from '@shared/domain/ValueObject';

export class EntitySlug extends ValueObject<{ value: string }> {
  constructor(value: string) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
      throw new Error('Invalid slug format');
    }
    super({ value });
  }
}

export class EntityStatus extends ValueObject<{ value: string }> {
  constructor(value: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') {
    super({ value });
  }
}

export class EntityTypeId extends ValueObject<{ value: string }> {
  constructor(value: string) {
    super({ value });
  }
}

export class ExternalIdentifier extends ValueObject<{ system: string; value: string }> {
  constructor(props: { system: string; value: string }) {
    super(props);
  }
}

export class AliasName extends ValueObject<{ value: string }> {
  constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }

  public static create(value: string): AliasName {
    return new AliasName(value);
  }
}

export class VersionNumber extends ValueObject<{ value: number }> {
  constructor(value: number) {
    if (value < 1) throw new Error('Version must be >= 1');
    super({ value });
  }
}

export class Visibility extends ValueObject<{ value: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED' }> {
  constructor(value: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED') {
    super({ value });
  }
}
