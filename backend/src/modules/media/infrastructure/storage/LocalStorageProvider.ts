import { StorageProvider } from '@shared/infrastructure/storage/StorageProvider';
import * as fs from 'fs/promises';
import * as path from 'path';

export class LocalStorageProvider extends StorageProvider {
  private readonly storageDir: string;

  constructor(storageDir: string) {
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
    return fs.readFile(filePath);
  }

  async delete(filePath: string): Promise<void> {
    await fs.unlink(filePath);
  }
}
