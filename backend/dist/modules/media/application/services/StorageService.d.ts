import { StorageProvider } from '../../../../shared/infrastructure/storage/StorageProvider';
export declare class StorageService {
    private readonly storageProvider;
    constructor(storageProvider: StorageProvider);
    upload(path: string, data: Buffer): Promise<string>;
    download(path: string): Promise<Buffer>;
    delete(path: string): Promise<void>;
}
