import { ValueObject } from '@shared/domain/ValueObject';

interface EntityIdProps {
  value: string;
}

export class EntityId extends ValueObject<EntityIdProps> {
  private constructor(props: EntityIdProps) {
    super(props);
  }

  public static create(id: string): EntityId {
    const normalized = id?.trim();

    if (!normalized) {
      throw new Error('Entity ID cannot be empty.');
    }

    return new EntityId({ value: normalized });
  }

  get value(): string {
    return this.props.value;
  }
}