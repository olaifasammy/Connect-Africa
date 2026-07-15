import { ValueObject } from '../../../../shared/domain/ValueObject';
interface FileSizeProps {
    bytes: number;
}
export declare class FileSize extends ValueObject<FileSizeProps> {
    private constructor();
    static create(bytes: number): FileSize;
    get bytes(): number;
}
export {};
