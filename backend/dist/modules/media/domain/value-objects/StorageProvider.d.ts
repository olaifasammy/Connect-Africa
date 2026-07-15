import { ValueObject } from '../../../../shared/domain/ValueObject';
export declare enum StorageProviderType {
    LOCAL = "local",
    S3 = "s3",
    GCS = "gcs"
}
interface StorageProviderProps {
    type: StorageProviderType;
}
export declare class StorageProvider extends ValueObject<StorageProviderProps> {
    private constructor();
    static create(type: StorageProviderType): StorageProvider;
    get type(): StorageProviderType;
}
export {};
