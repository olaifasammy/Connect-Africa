import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Media } from '../../domain/models/Media';

@provide(MediaMetadataService, true)
@injectable()
export class MediaMetadataService {
  async extract(media: Media): Promise<void> {
    // Logic to extract metadata
  }
}
