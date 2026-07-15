import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { Media } from '../../domain/models/Media';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { PostgresProvider } from '../../../../shared/infrastructure/database/PostgresProvider';
import { MediaSearchDto } from '../../application/dtos/MediaSearchDto';
import { MediaId } from '../../domain/value-objects/MediaId';
import { MediaUsage } from '../../domain/models/MediaUsage';
export declare class PostgresMediaRepository implements IMediaRepository {
    private readonly postgresProvider;
    constructor(postgresProvider: PostgresProvider);
    findById(id: UniqueEntityId): Promise<Media | null>;
    save(entity: Media): Promise<void>;
    delete(id: UniqueEntityId): Promise<void>;
    search(query: MediaSearchDto): Promise<Media[]>;
    findByEntity(entityId: UniqueEntityId): Promise<Media[]>;
    findByArticle(articleId: UniqueEntityId): Promise<Media[]>;
    getUsage(mediaId: MediaId): Promise<MediaUsage | null>;
    attach(mediaId: MediaId, resourceType: string, resourceId: UniqueEntityId): Promise<void>;
}
