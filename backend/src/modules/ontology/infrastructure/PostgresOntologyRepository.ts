import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';
import { Ontology } from '@modules/ontology/domain/entities/Ontology';
import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

export class PostgresOntologyRepository implements IOntologyRepository {
  constructor(private readonly postgresProvider: PostgresProvider) {}

  async save(ontology: Ontology): Promise<void> {
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

  async findById(id: OntologyId): Promise<Ontology | null> {
    const query = 'SELECT * FROM ontologies WHERE id = $1';
    const result = await this.postgresProvider.query(query, [id.toString()]);
    if (result.rowCount === 0) return null;
    
    const row = result.rows[0];
    return Ontology.create({
      name: row.name,
      description: row.description,
      version: row.version,
      isPublished: row.is_published,
      isArchived: row.is_archived
    }, OntologyId.create(row.id));
  }

  async findByName(name: string): Promise<Ontology | null> {
    const query = 'SELECT * FROM ontologies WHERE name = $1';
    const result = await this.postgresProvider.query(query, [name]);
    if (result.rowCount === 0) return null;
    
    const row = result.rows[0];
    return Ontology.create({
      name: row.name,
      description: row.description,
      version: row.version,
      isPublished: row.is_published,
      isArchived: row.is_archived
    }, OntologyId.create(row.id));
  }

  async findAll(limit: number, offset: number): Promise<Ontology[]> {
    const query = 'SELECT * FROM ontologies LIMIT $1 OFFSET $2';
    const result = await this.postgresProvider.query(query, [limit, offset]);
    
    return result.rows.map((row: any) => Ontology.create({
      name: row.name,
      description: row.description,
      version: row.version,
      isPublished: row.is_published,
      isArchived: row.is_archived
    }, OntologyId.create(row.id)));
  }

  async exists(name: string): Promise<boolean> {
    const query = 'SELECT 1 FROM ontologies WHERE name = $1';
    const result = await this.postgresProvider.query(query, [name]);
    return result.rowCount > 0;
  }
}
