import { ValueObject } from '@shared/domain/ValueObject';

interface EntityNameProps {
  value: string;
}

export class EntityName extends ValueObject<EntityNameProps> {
  private constructor(props: EntityNameProps) {
    super(props);
  }

  public static create(name: string): EntityName {
    const normalized = name?.trim();

    if (!normalized) {
      throw new Error('Entity name cannot be empty.');
    }

    if (normalized.length > 255) {
      throw new Error('Entity name cannot exceed 255 characters.');
    }

    return new EntityName({ value: normalized });
  }

  get value(): string {
    return this.props.value;
  }
}
