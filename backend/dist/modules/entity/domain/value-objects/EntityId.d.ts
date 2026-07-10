import { ValueObject } from '../../../../shared/domain/ValueObject';
interface EntityIdProps {
    value: string;
}
export declare class EntityId extends ValueObject<EntityIdProps> {
    private constructor();
    static create(id: string): EntityId;
    get value(): string;
}
export {};
