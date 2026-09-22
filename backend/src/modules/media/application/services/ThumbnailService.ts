import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Media } from '../../domain/models/Media';

export interface ThumbnailGenerationResult {
  mediaId: string;
  thumbnailPath: string;
  width: number;
  height: number;
  generatedAt: Date;
}

@provide(ThumbnailService, true)
@injectable()
export class ThumbnailService {
  /**
   * Generates thumbnail specifications for an image or document media asset.
   */
  async generate(media: Media): Promise<ThumbnailGenerationResult> {
    const mediaId = media.id.toString();
    const mimeType = media.mimeType ? media.mimeType.value : '';

    const width = 300;
    const height = 300;
    const thumbnailPath = `thumbnails/${mediaId}_thumb.webp`;

    return {
      mediaId,
      thumbnailPath,
      width,
      height,
      generatedAt: new Date(),
    };
  }
}
