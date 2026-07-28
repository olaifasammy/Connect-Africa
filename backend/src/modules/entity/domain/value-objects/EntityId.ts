import { ValueObject } from '@shared/domain/ValueObject';

interface EntityIdProps {
  value: string;
}

export class EntityId extends ValueObject<EntityIdProps> {
  private constructor(props: EntityIdProps) {
    super(props);
  }

  public static create(id: string): EntityId {
    return new EntityId({ value: id });
  }

  get value(): string {
    return this.props.value;
  }
}
