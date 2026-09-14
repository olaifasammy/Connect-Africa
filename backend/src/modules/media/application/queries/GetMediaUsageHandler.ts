import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { GetMediaUsageQuery } from './GetMediaUsageQuery';
import { MediaUsageDto } from '../dtos/MediaUsageDto';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { MediaId } from '../../domain/value-objects/MediaId';

@provide(GetMediaUsageHandler, true)
@injectable()
export class GetMediaUsageHandler {
  constructor(
    @inject('IMediaRepository') private readonly mediaRepository: IMediaRepository
  ) {}

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
