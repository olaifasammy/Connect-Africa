import { ValueObject } from '../../../../shared/domain/ValueObject';
interface RecoveryCodeProps {
    hash: string;
}
export declare class RecoveryCode extends ValueObject<RecoveryCodeProps> {
    constructor(hash: string);
    get hash(): string;
}
export {};
