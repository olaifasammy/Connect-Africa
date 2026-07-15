import { MimeType } from '../value-objects/MimeType';

export class ImageValidator {
  static isValid(mimeType: MimeType): boolean {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return validImageTypes.includes(mimeType.value);
  }
}
