"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresSearchProvider = void 0;
const inversify_1 = require("inversify");
const pg_1 = require("pg");
const SearchProvider_1 = require("./SearchProvider");
const SearchDocument_1 = require("../../domain/models/SearchDocument");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
let PostgresSearchProvider = class PostgresSearchProvider extends SearchProvider_1.SearchProvider {
    pool;
    constructor(pool) {
        super();
        this.pool = pool;
    }
    async createIndex(name) {
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
    async deleteIndex(name) {
        await this.pool.query('DROP TABLE IF EXISTS search_documents');
    }
    async rebuildIndex(name) {
        await this.pool.query('TRUNCATE search_documents');
    }
    async findById(id) {
        const result = await this.pool.query('SELECT * FROM search_documents WHERE id = $1', [id]);
        return result.rows[0] || null;
    }
    async index(document) {
        await this.pool.query('INSERT INTO search_documents (id, resource_id, resource_type, content) VALUES ($1, $2, $3, $4)', [document.id.toString(), document.resourceId.toString(), document.resourceType, JSON.stringify(document.content)]);
    }
    async update(document) {
        await this.pool.query('UPDATE search_documents SET resource_id = $2, resource_type = $3, content = $4 WHERE id = $1', [document.id.toString(), document.resourceId.toString(), document.resourceType, JSON.stringify(document.content)]);
    }
    async search(query, filters, sortBy, sortOrder = 'desc', limit = 10, offset = 0, includeFacets) {
        let whereClause = `(to_tsvector('english', COALESCE(content->>'title', '') || ' ' || COALESCE(content->>'snippet', '')) @@ phraseto_tsquery('english', $1)
       OR to_tsvector('english', COALESCE(content->>'title', '') || ' ' || COALESCE(content->>'snippet', '')) @@ to_tsquery('english', $1 || ':*')
       OR content::text ILIKE $2
       OR content::text % $1)`;
        const params = [query, `%${query}%`];
        if (filters && filters.resourceType) {
            params.push(filters.resourceType);
            whereClause += ` AND resource_type = $${params.length}`;
        }
        // Map sortBy to SQL column
        let orderBy = 'rank';
        if (sortBy === 'alphabetical')
            orderBy = 'content->>\'title\'';
        else if (sortBy === 'dateCreated')
            orderBy = 'content->>\'createdAt\'';
        else if (sortBy === 'dateUpdated')
            orderBy = 'content->>\'updatedAt\'';
        else if (sortBy === 'popularity')
            orderBy = 'content->>\'popularity\'';
        params.push(limit);
        const limitParam = `$${params.length}`;
        params.push(offset);
        const offsetParam = `$${params.length}`;
        const result = await this.pool.query(`SELECT id, resource_id as "resourceId", resource_type as "resourceType", content,
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
       LIMIT ${limitParam} OFFSET ${offsetParam}`, params);
        const documents = result.rows.map(row => new SearchDocument_1.SearchDocument(new UniqueEntityId_1.UniqueEntityId(row.id), row.resourceType, new UniqueEntityId_1.UniqueEntityId(row.resourceId), row.content));
        let facets;
        if (includeFacets && includeFacets.length > 0) {
            facets = {};
            for (const facet of includeFacets) {
                facets[facet] = {};
                const facetResult = await this.pool.query(`SELECT content->>$1 as value, COUNT(*) as count
           FROM search_documents
           WHERE ${whereClause}
           GROUP BY content->>$1`, [facet, ...params.slice(0, 2), ...params.slice(2, params.length - 2)]);
                for (const row of facetResult.rows) {
                    if (row.value)
                        facets[facet][row.value] = parseInt(row.count);
                }
            }
        }
        return { documents, facets };
    }
    async bulkIndex(documents) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            for (const doc of documents) {
                await client.query('INSERT INTO search_documents (id, resource_id, resource_type, content) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET resource_id = $2, resource_type = $3, content = $4', [doc.id.toString(), doc.resourceId.toString(), doc.resourceType, JSON.stringify(doc.content)]);
            }
            await client.query('COMMIT');
        }
        catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }
        finally {
            client.release();
        }
    }
    async autocomplete(query) {
        const result = await this.pool.query(`SELECT DISTINCT content->>'title' as title 
       FROM search_documents 
       WHERE content->>'title' ILIKE $1 
       LIMIT 10`, [`${query}%`]);
        return result.rows.map(row => row.title);
    }
    async getSuggestions(query) {
        const result = await this.pool.query(`SELECT DISTINCT content->>'title' as title 
       FROM search_documents 
       WHERE content->>'title' ILIKE $1 
       LIMIT 10`, [`%${query}%`]);
        return result.rows.map(row => row.title);
    }
    async getTrending() {
        const result = await this.pool.query(`SELECT content->>'title' as title
       FROM search_documents
       ORDER BY COALESCE((content->>'popularity')::numeric, 0) DESC
       LIMIT 10`);
        return result.rows.map(row => row.title);
    }
    async delete(id) {
        await this.pool.query('DELETE FROM search_documents WHERE id = $1', [id]);
    }
};
exports.PostgresSearchProvider = PostgresSearchProvider;
exports.PostgresSearchProvider = PostgresSearchProvider = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(pg_1.Pool)),
    __metadata("design:paramtypes", [pg_1.Pool])
], PostgresSearchProvider);
//# sourceMappingURL=PostgresSearchProvider.js.map