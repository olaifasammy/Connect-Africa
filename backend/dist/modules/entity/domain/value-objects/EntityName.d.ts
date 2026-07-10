import { ValueObject } from '../../../../shared/domain/ValueObject';
interface EntityNameProps {
    value: string;
}
export declare class EntityName extends ValueObject<EntityNameProps> {
    private constructor();
    static create(name: string): EntityName;
    get value(): string;
}
export {};
