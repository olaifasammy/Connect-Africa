import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import * as exifParser from 'exif-parser';

@provide(ExifExtractionService, true)
@injectable()
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
