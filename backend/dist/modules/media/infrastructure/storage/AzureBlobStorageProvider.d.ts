import { StorageProvider } from '../../../../shared/infrastructure/storage/StorageProvider';
export declare class AzureBlobStorageProvider extends StorageProvider {
    private readonly connectionString;
    private readonly containerName;
    constructor(connectionString: string, containerName: string);
    upload(path: string, data: Buffer): Promise<string>;
    download(path: string): Promise<Buffer>;
    delete(path: string): Promise<void>;
}
