import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
@provide(ThumbnailService, true)
@injectable()
export class ThumbnailService {
  async generate(filePath: string): Promise<string> {
    // Implement thumbnail generation logic (e.g., using sharp)
    return `${filePath}_thumb`;
  }
}
