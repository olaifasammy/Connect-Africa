import { StorageProvider } from '../../../../shared/infrastructure/storage/StorageProvider';
export declare class GoogleCloudStorageProvider extends StorageProvider {
    private readonly bucketName;
    constructor(bucketName: string);
    upload(path: string, data: Buffer): Promise<string>;
    download(path: string): Promise<Buffer>;
    delete(path: string): Promise<void>;
}
