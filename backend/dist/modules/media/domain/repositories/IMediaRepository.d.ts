import { Media } from '../models/Media';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { MediaSearchDto } from '../../application/dtos/MediaSearchDto';
import { MediaId } from '../value-objects/MediaId';
import { MediaUsage } from '../models/MediaUsage';
export interface IMediaRepository {
    findById(id: UniqueEntityId): Promise<Media | null>;
    save(entity: Media): Promise<void>;
    delete(id: UniqueEntityId): Promise<void>;
    search(query: MediaSearchDto): Promise<Media[]>;
    findByEntity(entityId: UniqueEntityId): Promise<Media[]>;
    findByArticle(articleId: UniqueEntityId): Promise<Media[]>;
    getUsage(mediaId: MediaId): Promise<MediaUsage | null>;
    attach(mediaId: MediaId, resourceType: string, resourceId: UniqueEntityId): Promise<void>;
}
