import { StorageProvider } from '@shared/infrastructure/storage/StorageProvider';

export class AzureBlobStorageProvider extends StorageProvider {
  constructor(private readonly connectionString: string, private readonly containerName: string) {
    super();
  }

  async upload(path: string, data: Buffer): Promise<string> {
    // TODO: Implement Azure Blob Storage upload.
    // Dependency: Install @azure/storage-blob. Requires Azure Storage connection string.
    throw new Error('Not implemented');
  }

  async download(path: string): Promise<Buffer> {
    // TODO: Implement Azure Blob Storage download.
    throw new Error('Not implemented');
  }

  async delete(path: string): Promise<void> {
    // TODO: Implement Azure Blob Storage delete.
    throw new Error('Not implemented');
  }
}
