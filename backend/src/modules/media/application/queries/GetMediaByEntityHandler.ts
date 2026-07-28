import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { GetMediaByEntityQuery } from './GetMediaByEntityQuery';
import { MediaResponseDto } from '../dtos/MediaResponseDto';

export class GetMediaByEntityHandler {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async handle(query: GetMediaByEntityQuery): Promise<MediaResponseDto[]> {
    // Assuming IMediaRepository has a method to find by entity
    // In a real DB, there would be a join table or metadata link
    const mediaList = await this.mediaRepository.findByEntity(query.entityId);
    return mediaList.map(media => ({
      id: media.id.toString(),
      fileName: media.fileName.value,
      mimeType: media.mimeType.value,
      uploadedAt: media.uploadedAt.toISOString(),
    }));
  }
}
