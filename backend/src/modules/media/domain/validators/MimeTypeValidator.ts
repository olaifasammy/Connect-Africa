import { MimeType } from '../value-objects/MimeType';

export class MimeTypeValidator {
  static isValid(mimeType: MimeType): boolean {
    // Basic validation, could be expanded.
    return !!mimeType.value && mimeType.value.includes('/');
  }
}
