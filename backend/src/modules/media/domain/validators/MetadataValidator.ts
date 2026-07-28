import { MediaMetadata } from '../models/MediaMetadata';

export class MetadataValidator {
  static isValid(metadata: MediaMetadata): boolean {
    return !!metadata.key && metadata.key.length > 0 && !!metadata.value && metadata.value.length > 0;
  }
}
