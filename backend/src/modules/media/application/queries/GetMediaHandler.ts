import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { GetMediaQuery } from '../queries/GetMediaQuery';
import { MediaResponseDto } from '../dtos/MediaResponseDto';

@provide(GetMediaHandler, true)
@injectable()
export class GetMediaHandler {
  constructor(
    @inject('IMediaRepository') private readonly mediaRepository: IMediaRepository
  ) {}

  async handle(query: GetMediaQuery): Promise<MediaResponseDto | null> {
    const media = await this.mediaRepository.findById(new UniqueEntityId(query.id.value));
    if (!media) {
      return null;
    }
    return {
      id: media.id.toString(),
      fileName: media.fileName.value,
      mimeType: media.mimeType.value,
      uploadedAt: media.uploadedAt.toISOString(),
    };
  }
}
