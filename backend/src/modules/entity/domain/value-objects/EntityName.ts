import { ValueObject } from '@shared/domain/ValueObject';

interface EntityNameProps {
  value: string;
}

export class EntityName extends ValueObject<EntityNameProps> {
  private constructor(props: EntityNameProps) {
    super(props);
  }

  public static create(name: string): EntityName {
    if (!name || name.length < 1) {
      throw new Error('Entity name cannot be empty');
    }
    return new EntityName({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
