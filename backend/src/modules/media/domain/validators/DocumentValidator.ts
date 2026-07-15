import { MimeType } from '../value-objects/MimeType';

export class DocumentValidator {
  static isValid(mimeType: MimeType): boolean {
    const validDocumentTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    return validDocumentTypes.includes(mimeType.value);
  }
}
