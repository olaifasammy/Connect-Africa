import { MimeType } from '../value-objects/MimeType';

export class AudioValidator {
  static isValid(mimeType: MimeType): boolean {
    const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac'];
    return validAudioTypes.includes(mimeType.value);
  }
}
