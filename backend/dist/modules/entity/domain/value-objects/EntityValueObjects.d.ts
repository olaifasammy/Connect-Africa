import { ValueObject } from '../../../../shared/domain/ValueObject';
export declare class EntitySlug extends ValueObject<{
    value: string;
}> {
    constructor(value: string);
}
export declare class EntityStatus extends ValueObject<{
    value: string;
}> {
    constructor(value: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED');
}
export declare class EntityTypeId extends ValueObject<{
    value: string;
}> {
    constructor(value: string);
}
export declare class ExternalIdentifier extends ValueObject<{
    system: string;
    value: string;
}> {
    constructor(props: {
        system: string;
        value: string;
    });
}
export declare class AliasName extends ValueObject<{
    value: string;
}> {
    constructor(value: string);
    get value(): string;
    static create(value: string): AliasName;
}
export declare class VersionNumber extends ValueObject<{
    value: number;
}> {
    constructor(value: number);
}
export declare class Visibility extends ValueObject<{
    value: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED';
}> {
    constructor(value: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED');
}
