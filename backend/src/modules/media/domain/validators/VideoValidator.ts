import { MimeType } from '../value-objects/MimeType';

export class VideoValidator {
  static isValid(mimeType: MimeType): boolean {
    const validVideoTypes = ['video/mp4', 'video/mpeg', 'video/webm', 'video/ogg'];
    return validVideoTypes.includes(mimeType.value);
  }
}
