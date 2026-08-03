import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { GetMediaQuery } from '../queries/GetMediaQuery';
import { MediaResponseDto } from '../dtos/MediaResponseDto';

export class GetMediaHandler {
  constructor(private readonly mediaRepository: IMediaRepository) {}

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
