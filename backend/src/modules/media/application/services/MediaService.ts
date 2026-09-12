import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { Media } from '../../domain/models/Media';

@provide(MediaService, true)
@injectable()
export class MediaService {
  constructor(@inject('IMediaRepository') private readonly mediaRepository: IMediaRepository) {}

  async getMedia(id: string): Promise<Media | null> {
    // Media service logic
    return null;
  }
}
