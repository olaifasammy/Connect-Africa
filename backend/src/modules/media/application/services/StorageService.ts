import { StorageProvider } from '@shared/infrastructure/storage/StorageProvider';

export class StorageService {
  constructor(private readonly storageProvider: StorageProvider) {}

  async upload(path: string, data: Buffer): Promise<string> {
    return this.storageProvider.upload(path, data);
  }

  async download(path: string): Promise<Buffer> {
    return this.storageProvider.download(path);
  }

  async delete(path: string): Promise<void> {
    return this.storageProvider.delete(path);
  }
}
