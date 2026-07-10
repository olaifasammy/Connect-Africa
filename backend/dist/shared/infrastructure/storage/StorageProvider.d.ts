export declare abstract class StorageProvider {
    abstract upload(path: string, data: Buffer): Promise<string>;
    abstract download(path: string): Promise<Buffer>;
    abstract delete(path: string): Promise<void>;
}
