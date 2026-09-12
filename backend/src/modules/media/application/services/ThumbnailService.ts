import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Media } from '../../domain/models/Media';

@provide(ThumbnailService, true)
@injectable()
export class ThumbnailService {
  async generate(media: Media): Promise<void> {
    // Logic to generate thumbnail
  }
}
