import { injectable, inject } from 'inversify';
import { Pool } from 'pg';
import { SearchProvider, SearchResult } from './SearchProvider';
import { SearchDocument } from '../../domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@injectable()
export class PostgresSearchProvider extends SearchProvider {
  constructor(@inject(Pool) private readonly pool: Pool) {
    super();
  }

  async createIndex(name: string): Promise<void> {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS search_documents (
        id TEXT PRIMARY KEY,
        resource_id TEXT NOT NULL,
        resource_type TEXT NOT NULL,
        content JSONB NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_search_documents_content ON search_documents USING GIN (to_tsvector('english', content::text));
    `);
  }

  async deleteIndex(name: string): Promise<void> {
    await this.pool.query('DROP TABLE IF EXISTS search_documents');
  }

  async rebuildIndex(name: string): Promise<void> {
    await this.pool.query('TRUNCATE search_documents');
  }

  async findById(id: string): Promise<SearchDocument | null> {
    const result = await this.pool.query('SELECT * FROM search_documents WHERE id = $1', [id]);
    return result.rows[0] as SearchDocument || null;
  }

  async index(document: SearchDocument): Promise<void> {
    await this.pool.query(
      'INSERT INTO search_documents (id, resource_id, resource_type, content) VALUES ($1, $2, $3, $4)',
      [document.id.toString(), document.resourceId.toString(), document.resourceType, JSON.stringify(document.content)]
    );
  }

  async update(document: SearchDocument): Promise<void> {
    await this.pool.query(
      'UPDATE search_documents SET resource_id = $2, resource_type = $3, content = $4 WHERE id = $1',
      [document.id.toString(), document.resourceId.toString(), document.resourceType, JSON.stringify(document.content)]
    );
  }

  async search(
    query: string, 
    filters?: Record<string, any>,
    sortBy?: 'relevance' | 'alphabetical' | 'dateCreated' | 'dateUpdated' | 'popularity',
    sortOrder: 'asc' | 'desc' = 'desc',
    limit: number = 10,
    offset: number = 0,
    includeFacets?: string[]
  ): Promise<SearchResult> {
    let whereClause = `(to_tsvector('english', COALESCE(content->>'title', '') || ' ' || COALESCE(content->>'snippet', '')) @@ phraseto_tsquery('english', $1)
       OR to_tsvector('english', COALESCE(content->>'title', '') || ' ' || COALESCE(content->>'snippet', '')) @@ to_tsquery('english', $1 || ':*')
       OR content::text ILIKE $2
       OR content::text % $1)`;
    
    const params: any[] = [query, `%${query}%`];
    
    if (filters && filters.resourceType) {
      params.push(filters.resourceType);
      whereClause += ` AND resource_type = $${params.length}`;
    }

    // Map sortBy to SQL column
    let orderBy = 'rank';
    if (sortBy === 'alphabetical') orderBy = 'content->>\'title\'';
    else if (sortBy === 'dateCreated') orderBy = 'content->>\'createdAt\'';
    else if (sortBy === 'dateUpdated') orderBy = 'content->>\'updatedAt\'';
    else if (sortBy === 'popularity') orderBy = 'content->>\'popularity\'';

    params.push(limit);
    const limitParam = `$${params.length}`;
    params.push(offset);
    const offsetParam = `$${params.length}`;

    const result = await this.pool.query(
      `SELECT id, resource_id as "resourceId", resource_type as "resourceType", content,
              (
                ts_rank_cd(
                  setweight(to_tsvector('english', COALESCE(content->>'title', '')), 'A') || 
                  setweight(to_tsvector('english', COALESCE(content->>'snippet', '')), 'B'),
                  plainto_tsquery('english', $1),
                  32
                ) *
                COALESCE((content->>'popularity')::numeric, 1.0) *
                (1.0 / (1.0 + EXTRACT(EPOCH FROM (NOW() - (content->>'createdAt')::timestamp)) / 864000))
              ) as rank
       FROM search_documents 
       WHERE ${whereClause}
       ORDER BY ${orderBy} ${sortOrder}
       LIMIT ${limitParam} OFFSET ${offsetParam}`,
      params
    );

    const documents = result.rows.map(row => new SearchDocument(
        new UniqueEntityId(row.id), 
        row.resourceType, 
        new UniqueEntityId(row.resourceId), 
        row.content
    ));

    let facets: Record<string, Record<string, number>> | undefined;
    if (includeFacets && includeFacets.length > 0) {
      facets = {};
      for (const facet of includeFacets) {
        facets[facet] = {};
        const facetResult = await this.pool.query(
          `SELECT content->>$1 as value, COUNT(*) as count
           FROM search_documents
           WHERE ${whereClause}
           GROUP BY content->>$1`,
          [facet, ...params.slice(0, 2), ...params.slice(2, params.length - 2)]
        );
        for (const row of facetResult.rows) {
          if (row.value) facets[facet][row.value] = parseInt(row.count);
        }
      }
    }
    
    return { documents, facets };
  }

  async bulkIndex(documents: SearchDocument[]): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      for (const doc of documents) {
        await client.query(
          'INSERT INTO search_documents (id, resource_id, resource_type, content) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET resource_id = $2, resource_type = $3, content = $4',
          [doc.id.toString(), doc.resourceId.toString(), doc.resourceType, JSON.stringify(doc.content)]
        );
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  async autocomplete(query: string): Promise<string[]> {
    const result = await this.pool.query(
      `SELECT DISTINCT content->>'title' as title 
       FROM search_documents 
       WHERE content->>'title' ILIKE $1 
       LIMIT 10`,
      [`${query}%`]
    );
    return result.rows.map(row => row.title);
  }

  async getSuggestions(query: string): Promise<string[]> {
    const result = await this.pool.query(
      `SELECT DISTINCT content->>'title' as title 
       FROM search_documents 
       WHERE content->>'title' ILIKE $1 
       LIMIT 10`,
      [`%${query}%`]
    );
    return result.rows.map(row => row.title);
  }

  async getTrending(): Promise<string[]> {
    const result = await this.pool.query(
      `SELECT content->>'title' as title
       FROM search_documents
       ORDER BY COALESCE((content->>'popularity')::numeric, 0) DESC
       LIMIT 10`
    );
    return result.rows.map(row => row.title);
  }

  async delete(id: string): Promise<void> {
    await this.pool.query('DELETE FROM search_documents WHERE id = $1', [id]);
  }
}
