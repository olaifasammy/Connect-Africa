import { ValueObject } from '../../../../shared/domain/ValueObject';
interface MimeTypeProps {
    value: string;
}
export declare class MimeType extends ValueObject<MimeTypeProps> {
    constructor(value: string);
    get value(): string;
}
export {};
