import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { GetMediaUsageQuery } from './GetMediaUsageQuery';
import { MediaUsageDto } from '../dtos/MediaUsageDto';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { MediaId } from '../../domain/value-objects/MediaId';

export class GetMediaUsageHandler {
  constructor(private readonly mediaRepository: IMediaRepository) {}

  async handle(query: GetMediaUsageQuery): Promise<MediaUsageDto[]> {
    const usage = await this.mediaRepository.getUsage(new MediaId(query.mediaId.value));
    if (!usage) return [];
    
    return [{
      mediaId: usage.mediaId.toString(),
      entityType: usage.resourceType,
      entityId: usage.resourceId.toString(),
    }];
  }
}
