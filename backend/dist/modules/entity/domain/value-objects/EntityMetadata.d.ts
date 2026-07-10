import { ValueObject } from '../../../../shared/domain/ValueObject';
interface EntityMetadataProps {
    slug?: string;
    description?: string;
    source?: string;
    tags: string[];
}
export declare class EntityMetadata extends ValueObject<EntityMetadataProps> {
    private constructor();
    static create(props: EntityMetadataProps): EntityMetadata;
    get slug(): string | undefined;
    get description(): string | undefined;
    get source(): string | undefined;
    get tags(): string[];
    merge(other: EntityMetadata): EntityMetadata;
}
export {};
