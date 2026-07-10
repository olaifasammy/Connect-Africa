import { ValueObject } from '../../../../shared/domain/ValueObject';
interface PropertyDefinitionProps {
    dataType: string;
}
export declare class PropertyDefinition extends ValueObject<PropertyDefinitionProps> {
    constructor(props: PropertyDefinitionProps);
    get dataType(): string;
}
export {};
