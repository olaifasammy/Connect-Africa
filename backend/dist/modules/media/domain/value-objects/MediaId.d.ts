import { ValueObject } from '../../../../shared/domain/ValueObject';
interface MediaIdProps {
    value: string;
}
export declare class MediaId extends ValueObject<MediaIdProps> {
    constructor(value: string);
    get value(): string;
}
export {};
