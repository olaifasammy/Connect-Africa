import { ValueObject } from '../../../../shared/domain/ValueObject';
interface FileHashProps {
    value: string;
    algorithm: 'sha256' | 'md5';
}
export declare class FileHash extends ValueObject<FileHashProps> {
    private constructor();
    static create(value: string, algorithm?: 'sha256' | 'md5'): FileHash;
    get value(): string;
    get algorithm(): 'sha256' | 'md5';
}
export {};
