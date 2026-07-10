import { ValueObject } from '../../../../shared/domain/ValueObject';
export interface MetadataDefinitionProps {
    name: string;
    type: string;
    required: boolean;
}
export declare class MetadataDefinition extends ValueObject<MetadataDefinitionProps> {
    private constructor();
    static create(props: MetadataDefinitionProps): MetadataDefinition;
    get name(): string;
    get type(): string;
    get required(): boolean;
}
