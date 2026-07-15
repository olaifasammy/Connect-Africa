import { ValueObject } from '../../../../shared/domain/ValueObject';
interface FilePathProps {
    value: string;
}
export declare class FilePath extends ValueObject<FilePathProps> {
    private constructor();
    static create(path: string): FilePath;
    get value(): string;
}
export {};
