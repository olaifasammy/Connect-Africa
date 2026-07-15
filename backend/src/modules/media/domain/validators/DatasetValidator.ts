import { MimeType } from '../value-objects/MimeType';

export class DatasetValidator {
  static isValid(mimeType: MimeType): boolean {
    const validDatasetTypes = ['application/json', 'text/csv', 'application/xml'];
    return validDatasetTypes.includes(mimeType.value);
  }
}
