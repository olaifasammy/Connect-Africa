import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { StorageProvider } from '@shared/infrastructure/storage/StorageProvider';
import * as fs from 'fs/promises';
import * as path from 'path';

@provide(AzureBlobStorageProvider, true)
@injectable()
export class AzureBlobStorageProvider extends StorageProvider {
  private readonly storageDir: string;

  constructor(storageDir: string = './uploads/azure') {
    super();
    this.storageDir = storageDir;
  }

  async upload(filePath: string, data: Buffer): Promise<string> {
    const fullPath = path.join(this.storageDir, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, data);
    return fullPath;
  }

  async download(filePath: string): Promise<Buffer> {
    const fullPath = path.join(this.storageDir, filePath);
    return fs.readFile(fullPath);
  }

  async delete(filePath: string): Promise<void> {
    const fullPath = path.join(this.storageDir, filePath);
    await fs.unlink(fullPath).catch(() => {});
  }
}
