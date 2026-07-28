import { Pool } from 'pg';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { Source } from '../../domain/entities/Source';
import { SourceId, SourceType, Provenance } from '../../domain/value-objects/SourceValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class PostgresSourceRepository implements ISourceRepository {
  constructor(private readonly db: Pool) {}

  private mapRowToSource(row: any): Source {
    return Source.create({
      title: row.title,
      type: row.type as SourceType,
      provenance: new Provenance(row.author, new Date(row.published_at), row.url, row.publisher),
      createdAt: new Date(row.created_at)
    }, new SourceId(row.id));
  }

  async findById(id: SourceId): Promise<Source | null> {
    const query = 'SELECT * FROM sources WHERE id = $1';
    const result = await this.db.query(query, [id.toString()]);
    if (result.rows.length === 0) return null;
    return this.mapRowToSource(result.rows[0]);
  }

  async save(source: Source): Promise<void> {
    const query = `
      INSERT INTO sources (id, title, type, author, published_at, url, publisher, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE SET 
        title = EXCLUDED.title,
        type = EXCLUDED.type,
        author = EXCLUDED.author,
        published_at = EXCLUDED.published_at,
        url = EXCLUDED.url,
        publisher = EXCLUDED.publisher
    `;
    await this.db.query(query, [
      source.id.toString(),
      source.title,
      source.type,
      source.provenance.author,
      source.provenance.publishedAt,
      source.provenance.url,
      source.provenance.publisher,
      source.createdAt
    ]);
  }

  async delete(id: SourceId): Promise<void> {
    await this.db.query('DELETE FROM sources WHERE id = $1', [id.toString()]);
  }
}
