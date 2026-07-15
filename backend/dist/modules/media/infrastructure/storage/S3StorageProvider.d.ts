import { StorageProvider } from '../../../../shared/infrastructure/storage/StorageProvider';
export declare class S3StorageProvider extends StorageProvider {
    private readonly client;
    private readonly bucket;
    constructor(region: string, bucket: string);
    upload(path: string, data: Buffer): Promise<string>;
    download(path: string): Promise<Buffer>;
    delete(path: string): Promise<void>;
}
