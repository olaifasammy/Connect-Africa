import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { Media } from '../../domain/models/Media';

export class MediaService {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async getMedia(id: string): Promise<Media | null> {
    // Media service logic
    return null;
  }
}
