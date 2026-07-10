import { ValueObject } from '../../../../shared/domain/ValueObject';
interface PasswordHashProps {
    value: string;
}
export declare class PasswordHash extends ValueObject<PasswordHashProps> {
    constructor(hash: string);
    get value(): string;
}
export {};
