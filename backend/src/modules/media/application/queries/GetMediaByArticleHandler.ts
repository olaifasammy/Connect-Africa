import { inject } from 'inversify';
import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { GetMediaByArticleQuery } from './GetMediaByArticleQuery';
import { MediaResponseDto } from '../dtos/MediaResponseDto';

export class GetMediaByArticleHandler {
  constructor(
    @inject('IMediaRepository') private readonly mediaRepository: IMediaRepository
  ) {}

  async handle(query: GetMediaByArticleQuery): Promise<MediaResponseDto[]> {
    const mediaList = await this.mediaRepository.findByArticle(query.articleId);
    return mediaList.map(media => ({
      id: media.id.toString(),
      fileName: media.fileName.value,
      mimeType: media.mimeType.value,
      uploadedAt: media.uploadedAt.toISOString(),
    }));
  }
}
