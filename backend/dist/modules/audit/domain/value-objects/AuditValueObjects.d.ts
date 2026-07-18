import { ValueObject } from '../../../../shared/domain/ValueObject';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class AuditId extends UniqueEntityId {
}
export declare class UserId extends UniqueEntityId {
}
export declare class ResourceId extends UniqueEntityId {
}
interface ValueProps {
    value: string;
}
export declare class CorrelationId extends ValueObject<ValueProps> {
    constructor(value: string);
}
export declare class IPAddress extends ValueObject<ValueProps> {
    constructor(value: string);
}
export declare class UserAgent extends ValueObject<ValueProps> {
    constructor(value: string);
}
export declare class Timestamp extends ValueObject<{
    value: Date;
}> {
    constructor(value: Date);
}
export {};
