import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { Media } from '../../domain/models/Media';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(MediaService, true)
@injectable()
export class MediaService {
  constructor(@inject('IMediaRepository') private readonly mediaRepository: IMediaRepository) {}

  async getMedia(id: string): Promise<Media | null> {
    return await this.mediaRepository.findById(new UniqueEntityId(id));
  }
}
