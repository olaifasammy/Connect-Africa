import { ValueObject } from '@shared/domain/ValueObject';

export class EntityStatus extends ValueObject<{
  value: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}> {
  constructor(value: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') {
    if (!value) {
      throw new Error('Entity status cannot be empty.');
    }

    super({ value });
  }

  get value(): 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' {
    return this.props.value;
  }

  public static create(
    value: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  ): EntityStatus {
    return new EntityStatus(value);
  }
}

export class EntityTypeId extends ValueObject<{ value: string }> {
  constructor(value: string) {
    const normalized = value?.trim();

    if (!normalized) {
      throw new Error('Entity type ID cannot be empty.');
    }

    super({ value: normalized });
  }

  get value(): string {
    return this.props.value;
  }

  public static create(value: string): EntityTypeId {
    return new EntityTypeId(value);
  }
}

export class ExternalIdentifier extends ValueObject<{
  system: string;
  value: string;
}> {
  constructor(props: { system: string; value: string }) {
    const system = props.system?.trim();
    const value = props.value?.trim();

    if (!system) {
      throw new Error('External identifier system cannot be empty.');
    }

    if (!value) {
      throw new Error('External identifier value cannot be empty.');
    }

    if (system.length > 100) {
      throw new Error(
        'External identifier system cannot exceed 100 characters.'
      );
    }

    if (value.length > 100) {
      throw new Error(
        'External identifier value cannot exceed 100 characters.'
      );
    }

    super({ system, value });
  }

  get system(): string {
    return this.props.system;
  }

  get value(): string {
    return this.props.value;
  }

  public static create(props: {
    system: string;
    value: string;
  }): ExternalIdentifier {
    return new ExternalIdentifier(props);
  }
}

export class AliasName extends ValueObject<{ value: string }> {
  constructor(value: string) {
    const normalized = value?.trim();

    if (!normalized) {
      throw new Error('Alias cannot be empty.');
    }

    if (normalized.length > 100) {
      throw new Error(
        'Alias cannot exceed 100 characters.'
      );
    }

    super({ value: normalized });
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
    if (!Number.isInteger(value) || value < 1) {
      throw new Error(
        'Version must be an integer >= 1.'
      );
    }

    super({ value });
  }

  get value(): number {
    return this.props.value;
  }

  public static create(value: number): VersionNumber {
    return new VersionNumber(value);
  }
}

export class Visibility extends ValueObject<{
  value: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED';
}> {
  constructor(value: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED') {
    if (!value) {
      throw new Error('Visibility cannot be empty.');
    }

    super({ value });
  }

  get value(): 'PUBLIC' | 'PRIVATE' | 'RESTRICTED' {
    return this.props.value;
  }

  public static create(
    value: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED'
  ): Visibility {
    return new Visibility(value);
  }
}
