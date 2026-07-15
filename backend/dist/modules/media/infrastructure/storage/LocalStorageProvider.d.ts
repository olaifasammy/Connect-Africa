import { StorageProvider } from '../../../../shared/infrastructure/storage/StorageProvider';
export declare class LocalStorageProvider extends StorageProvider {
    private readonly storageDir;
    constructor(storageDir: string);
    upload(filePath: string, data: Buffer): Promise<string>;
    download(filePath: string): Promise<Buffer>;
    delete(filePath: string): Promise<void>;
}
