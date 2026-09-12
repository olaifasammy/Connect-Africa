import { ValueObject } from '@shared/domain/ValueObject';

export type PropertyDataType =
  | 'STRING'
  | 'TEXT'
  | 'INTEGER'
  | 'NUMBER'
  | 'BOOLEAN'
  | 'DATE'
  | 'DATETIME'
  | 'JSON';

interface PropertyDefinitionProps {
  dataType: PropertyDataType;
}

export class PropertyDefinition
  extends ValueObject<PropertyDefinitionProps>
{
  private constructor(
    props: PropertyDefinitionProps,
  ) {
    super(props);
  }

  public static create(
    dataType: string,
  ): PropertyDefinition {
    const normalized =
      dataType?.trim().toUpperCase();

    if (
      !normalized ||
      !PropertyDefinition.isSupportedDataType(
        normalized,
      )
    ) {
      throw new Error(
        `Unsupported property data type: ${dataType}.`,
      );
    }

    return new PropertyDefinition({
      dataType:
        normalized as PropertyDataType,
    });
  }

  private static isSupportedDataType(
    value: string,
  ): value is PropertyDataType {
    return (
      value === 'STRING' ||
      value === 'TEXT' ||
      value === 'INTEGER' ||
      value === 'NUMBER' ||
      value === 'BOOLEAN' ||
      value === 'DATE' ||
      value === 'DATETIME' ||
      value === 'JSON'
    );
  }

  get dataType(): PropertyDataType {
    return this.props.dataType;
  }
}