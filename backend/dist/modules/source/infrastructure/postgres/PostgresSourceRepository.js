"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresSourceRepository = void 0;
const Source_1 = require("../../domain/entities/Source");
const SourceValueObjects_1 = require("../../domain/value-objects/SourceValueObjects");
class PostgresSourceRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    mapRowToSource(row) {
        return Source_1.Source.create({
            title: row.title,
            type: row.type,
            provenance: new SourceValueObjects_1.Provenance(row.author, new Date(row.published_at), row.url, row.publisher),
            createdAt: new Date(row.created_at)
        }, new SourceValueObjects_1.SourceId(row.id));
    }
    async findById(id) {
        const query = 'SELECT * FROM sources WHERE id = $1';
        const result = await this.db.query(query, [id.toString()]);
        if (result.rows.length === 0)
            return null;
        return this.mapRowToSource(result.rows[0]);
    }
    async save(source) {
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
    async delete(id) {
        await this.db.query('DELETE FROM sources WHERE id = $1', [id.toString()]);
    }
}
exports.PostgresSourceRepository = PostgresSourceRepository;
//# sourceMappingURL=PostgresSourceRepository.js.map