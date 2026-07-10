import { ValueObject } from '../../../../shared/domain/ValueObject';
interface UserProfileIdProps {
    value: string;
}
export declare class UserProfileId extends ValueObject<UserProfileIdProps> {
    private constructor();
    get value(): string;
    static create(value: string): UserProfileId;
}
export {};
