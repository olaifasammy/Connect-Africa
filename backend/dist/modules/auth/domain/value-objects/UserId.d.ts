import { ValueObject } from '../../../../shared/domain/ValueObject';
interface UserIdProps {
    value: string;
}
export declare class UserId extends ValueObject<UserIdProps> {
    private constructor();
    get value(): string;
    static create(value: string): UserId;
}
export {};
