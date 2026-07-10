import { ValueObject } from '../../../../shared/domain/ValueObject';
interface MfaSecretProps {
    value: string;
}
export declare class MfaSecret extends ValueObject<MfaSecretProps> {
    constructor(value: string);
    get value(): string;
}
export {};
