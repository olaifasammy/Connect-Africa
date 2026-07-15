import { ValueObject } from '../../../../shared/domain/ValueObject';
interface FileNameProps {
    value: string;
}
export declare class FileName extends ValueObject<FileNameProps> {
    constructor(value: string);
    get value(): string;
}
export {};
