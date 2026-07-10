"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresOntologyRepository = void 0;
const Ontology_1 = require("../../ontology/domain/entities/Ontology");
const OntologyId_1 = require("../../ontology/domain/value-objects/OntologyId");
class PostgresOntologyRepository {
    postgresProvider;
    constructor(postgresProvider) {
        this.postgresProvider = postgresProvider;
    }
    async save(ontology) {
        const query = `
      INSERT INTO ontologies (id, name, description, version)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE
      SET name = EXCLUDED.name, description = EXCLUDED.description, version = EXCLUDED.version;
    `;
        await this.postgresProvider.query(query, [
            ontology.id.toString(),
            ontology.name,
            ontology.description,
            ontology.version,
        ]);
    }
    async findById(id) {
        const query = 'SELECT * FROM ontologies WHERE id = $1';
        const result = await this.postgresProvider.query(query, [id.toString()]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return Ontology_1.Ontology.create({
            name: row.name,
            description: row.description,
            version: row.version,
            isPublished: row.is_published,
            isArchived: row.is_archived
        }, OntologyId_1.OntologyId.create(row.id));
    }
    async findByName(name) {
        const query = 'SELECT * FROM ontologies WHERE name = $1';
        const result = await this.postgresProvider.query(query, [name]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return Ontology_1.Ontology.create({
            name: row.name,
            description: row.description,
            version: row.version,
            isPublished: row.is_published,
            isArchived: row.is_archived
        }, OntologyId_1.OntologyId.create(row.id));
    }
    async findAll(limit, offset) {
        const query = 'SELECT * FROM ontologies LIMIT $1 OFFSET $2';
        const result = await this.postgresProvider.query(query, [limit, offset]);
        return result.rows.map((row) => Ontology_1.Ontology.create({
            name: row.name,
            description: row.description,
            version: row.version,
            isPublished: row.is_published,
            isArchived: row.is_archived
        }, OntologyId_1.OntologyId.create(row.id)));
    }
    async exists(name) {
        const query = 'SELECT 1 FROM ontologies WHERE name = $1';
        const result = await this.postgresProvider.query(query, [name]);
        return result.rowCount > 0;
    }
}
exports.PostgresOntologyRepository = PostgresOntologyRepository;
//# sourceMappingURL=PostgresOntologyRepository.js.map