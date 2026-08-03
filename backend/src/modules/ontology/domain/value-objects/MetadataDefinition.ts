import { ValueObject } from '@shared/domain/ValueObject';

export interface MetadataDefinitionProps {
  name: string;
  type: string;
  required: boolean;
}

export class MetadataDefinition extends ValueObject<MetadataDefinitionProps> {
  private constructor(props: MetadataDefinitionProps) {
    super(props);
  }

  public static create(props: MetadataDefinitionProps): MetadataDefinition {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Metadata name is required');
    }
    return new MetadataDefinition(props);
  }

  get name(): string {
    return this.props.name;
  }

  get type(): string {
    return this.props.type;
  }

  get required(): boolean {
    return this.props.required;
  }
}
