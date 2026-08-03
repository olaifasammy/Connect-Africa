import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { Media } from '../../domain/models/Media';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { FileName } from '../../domain/value-objects/FileName';
import { MimeType } from '../../domain/value-objects/MimeType';
import { MediaStatus } from '../../domain/value-objects/MediaStatus';
import { MediaSearchDto } from '../../application/dtos/MediaSearchDto';
import { MediaId } from '../../domain/value-objects/MediaId';
import { MediaUsage } from '../../domain/models/MediaUsage';

export class PostgresMediaRepository implements IMediaRepository {
  constructor(private readonly postgresProvider: PostgresProvider) {}

  async findById(id: UniqueEntityId): Promise<Media | null> {
    const result = await this.postgresProvider.query(
      'SELECT * FROM media WHERE id = $1',
      [id.toString()]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return Media.create(
      {
        fileName: new FileName(row.file_name),
        mimeType: new MimeType(row.mime_type),
        filePath: row.file_path,
        fileSize: Number(row.size),
        uploadedAt: row.created_at,
        status: MediaStatus.fromString(row.status),
        title: row.title,
        ownerId: new UniqueEntityId(row.owner_id),
      },
      new UniqueEntityId(row.id)
    );
  }

  async save(entity: Media): Promise<void> {
    await this.postgresProvider.query(
      `INSERT INTO media (id, file_name, mime_type, file_path, size, status, title, owner_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO UPDATE
       SET file_name = $2, mime_type = $3, file_path = $4, size = $5, status = $6, title = $7, owner_id = $8, updated_at = $10`,
      [
        entity.id.toString(),
        entity.fileName.value,
        entity.mimeType.value,
        entity.filePath,
        entity.fileSize,
        entity.status.value,
        entity.title,
        entity.ownerId.toString(),
        entity.uploadedAt,
        new Date(),
      ]
    );
  }

  async delete(id: UniqueEntityId): Promise<void> {
    await this.postgresProvider.query('DELETE FROM media WHERE id = $1', [
      id.toString(),
    ]);
  }

  async search(query: MediaSearchDto): Promise<Media[]> {
    const result = await this.postgresProvider.query(
      'SELECT * FROM media WHERE file_name ILIKE $1',
      [`%${query.query || ''}%`]
    );
    return result.rows.map((row: any) =>
      Media.create(
        {
          fileName: new FileName(row.file_name),
          mimeType: new MimeType(row.mime_type),
          filePath: row.file_path,
          fileSize: Number(row.size),
          uploadedAt: row.created_at,
          status: MediaStatus.fromString(row.status),
          title: row.title,
            ownerId: new UniqueEntityId(row.owner_id),
      },
        new UniqueEntityId(row.id)
      )
    );
  }

  async findByEntity(entityId: UniqueEntityId): Promise<Media[]> {
    const result = await this.postgresProvider.query(
      'SELECT m.* FROM media m JOIN entity_media em ON m.id = em.media_id WHERE em.entity_id = $1',
      [entityId.toString()]
    );
    return result.rows.map((row: any) =>
      Media.create(
        {
          fileName: new FileName(row.file_name),
          mimeType: new MimeType(row.mime_type),
          filePath: row.file_path,
          fileSize: Number(row.size),
          uploadedAt: row.created_at,
          status: MediaStatus.fromString(row.status),
          title: row.title,
          ownerId: new UniqueEntityId(row.owner_id),
        },
        new UniqueEntityId(row.id)
      )
    );
  }

  async findByArticle(articleId: UniqueEntityId): Promise<Media[]> {
    const result = await this.postgresProvider.query(
      'SELECT m.* FROM media m JOIN article_media am ON m.id = am.media_id WHERE am.article_id = $1',
      [articleId.toString()]
    );
    return result.rows.map((row: any) =>
      Media.create(
        {
          fileName: new FileName(row.file_name),
          mimeType: new MimeType(row.mime_type),
          filePath: row.file_path,
          fileSize: Number(row.size),
          uploadedAt: row.created_at,
          status: MediaStatus.fromString(row.status),
          title: row.title,
          ownerId: new UniqueEntityId(row.owner_id),
        },
        new UniqueEntityId(row.id)
      )
    );
  }

  async getUsage(mediaId: MediaId): Promise<MediaUsage | null> {
    const result = await this.postgresProvider.query(
      'SELECT * FROM media_usage WHERE media_id = $1 LIMIT 1',
      [mediaId.value]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return MediaUsage.create(
      {
        mediaId: new UniqueEntityId(row.media_id),
        resourceType: row.resource_type,
        resourceId: new UniqueEntityId(row.resource_id),
        usedAt: row.created_at,
      },
      new UniqueEntityId(row.id)
    );
  }

  async attach(mediaId: MediaId, resourceType: string, resourceId: UniqueEntityId): Promise<void> {
    // 1. Insert into specific junction table if it exists (e.g., entity, article)
    const junctionTable = `${resourceType}_media`;
    const resourceColumn = `${resourceType}_id`;
    
    // We only support specific tables if they exist. Otherwise, we rely on media_usage.
    if (['entity', 'article'].includes(resourceType)) {
      try {
        await this.postgresProvider.query(
          `INSERT INTO ${junctionTable} (${resourceColumn}, media_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [resourceId.toString(), mediaId.value]
        );
      } catch (error) {
        // Log error but continue to media_usage tracking
        console.error(`Failed to insert into ${junctionTable}:`, error);
      }
    }

    // 2. Insert into media_usage for audit/tracking
    await this.postgresProvider.query(
      'INSERT INTO media_usage (id, media_id, resource_type, resource_id) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
      [new UniqueEntityId().toString(), mediaId.value, resourceType, resourceId.toString()]
    );
  }
}
