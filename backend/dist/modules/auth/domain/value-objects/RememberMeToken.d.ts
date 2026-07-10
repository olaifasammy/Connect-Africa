import { ValueObject } from '../../../../shared/domain/ValueObject';
interface RememberMeTokenProps {
    value: string;
    userId: string;
    expiresAt: Date;
}
export declare class RememberMeToken extends ValueObject<RememberMeTokenProps> {
    private constructor();
    get value(): string;
    static create(userId: string, expiresAt: Date): RememberMeToken;
}
export {};
