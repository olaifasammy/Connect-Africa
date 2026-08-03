export class AllowedFileTypePolicy {
  static isAllowed(mimeType: string): boolean {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'audio/mpeg',
      'application/pdf',
      'application/json'
    ];
    return allowedTypes.includes(mimeType);
  }
}
