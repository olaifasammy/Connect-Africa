import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { StorageProvider } from '@shared/infrastructure/storage/StorageProvider';

@provide(GoogleCloudStorageProvider, true)
@injectable()
export class GoogleCloudStorageProvider extends StorageProvider {
  constructor(private readonly bucketName: string) {
    super();
  }

  async upload(path: string, data: Buffer): Promise<string> {
    // TODO: Implement Google Cloud Storage upload.
    // Dependency: Install @google-cloud/storage. Requires GCP credentials configuration.
    throw new Error('Not implemented');
  }

  async download(path: string): Promise<Buffer> {
    // TODO: Implement Google Cloud Storage download.
    throw new Error('Not implemented');
  }

  async delete(path: string): Promise<void> {
    // TODO: Implement Google Cloud Storage delete.
    throw new Error('Not implemented');
  }
}
