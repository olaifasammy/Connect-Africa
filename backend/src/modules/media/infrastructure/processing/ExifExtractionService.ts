import * as exifParser from 'exif-parser';

export class ExifExtractionService {
  async extract(buffer: Buffer): Promise<Record<string, any>> {
    try {
      const parser = exifParser.create(buffer);
      return parser.parse().tags;
    } catch (error) {
      return {};
    }
  }
}
