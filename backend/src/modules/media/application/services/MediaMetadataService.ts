import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Media } from '../../domain/models/Media';

export interface ExtractedMediaMetadata {
  mimeType: string;
  sizeBytes: number;
  extractedAt: Date;
  format?: string;
}

@provide(MediaMetadataService, true)
@injectable()
export class MediaMetadataService {
  /**
   * Extracts technical metadata attributes for an uploaded media asset.
   */
  async extract(media: Media): Promise<ExtractedMediaMetadata> {
    const mimeType = media.mimeType ? media.mimeType.value : 'application/octet-stream';
    const sizeBytes = typeof media.fileSize === 'number' ? media.fileSize : 0;

    return {
      mimeType,
      sizeBytes,
      extractedAt: new Date(),
      format: mimeType.split('/')[1] || 'unknown',
    };
  }
}
