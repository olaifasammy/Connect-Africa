import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { SearchMediaQuery } from '../queries/SearchMediaQuery';
import { MediaResponseDto } from '../dtos/MediaResponseDto';

@provide(SearchMediaHandler, true)
@injectable()
export class SearchMediaHandler {
  constructor(
    @inject('IMediaRepository') private readonly mediaRepository: IMediaRepository
  ) {}

  async handle(query: SearchMediaQuery): Promise<MediaResponseDto[]> {
    const mediaList = await this.mediaRepository.search(query.data);
    return mediaList.map((media) => ({
      id: media.id.toString(),
      fileName: media.fileName.value,
      mimeType: media.mimeType.value,
      uploadedAt: media.uploadedAt.toISOString(),
    }));
  }
}
