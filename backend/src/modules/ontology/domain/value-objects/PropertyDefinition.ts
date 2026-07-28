import { ValueObject } from '@shared/domain/ValueObject';

interface PropertyDefinitionProps {
  dataType: string;
}

export class PropertyDefinition extends ValueObject<PropertyDefinitionProps> {
  constructor(props: PropertyDefinitionProps) {
    super(props);
  }

  get dataType(): string {
    return this.props.dataType;
  }
}
