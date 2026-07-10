import { ValueObject } from '../../../../shared/domain/ValueObject';
interface EmailProps {
    value: string;
}
export declare class Email extends ValueObject<EmailProps> {
    constructor(email: string);
    get value(): string;
}
export {};
