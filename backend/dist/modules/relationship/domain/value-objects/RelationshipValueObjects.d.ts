import { ValueObject } from '../../../../shared/domain/ValueObject';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class RelationshipId extends UniqueEntityId {
    constructor(value?: string);
}
export declare class EntityId extends ValueObject<{
    value: string;
}> {
    constructor(value: string);
    get value(): string;
}
export declare class SourceEntityId extends EntityId {
}
export declare class TargetEntityId extends EntityId {
}
export declare class RelationshipTypeId extends ValueObject<{
    value: string;
}> {
    constructor(value: string);
    get value(): string;
}
export declare class RelationshipStatus extends ValueObject<{
    value: string;
}> {
    constructor(value: string);
    static create(value: string): RelationshipStatus;
}
export declare class ConfidenceScore extends ValueObject<{
    value: number;
}> {
    constructor(value: number);
}
export declare class VersionNumber extends ValueObject<{
    value: number;
}> {
    constructor(value: number);
}
export declare class ValidTimeRange extends ValueObject<{
    start: Date;
    end?: Date;
}> {
    constructor(props: {
        start: Date;
        end?: Date;
    });
}
export declare class Metadata extends ValueObject<{
    value: Record<string, any>;
}> {
    constructor(value: Record<string, any>);
}
