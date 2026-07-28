import { IOntologyVersionRepository } from '../domain/repositories/IOntologyVersionRepository';
import { OntologyVersion } from '../domain/entities/OntologyVersion';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

export class PostgresOntologyVersionRepository implements IOntologyVersionRepository {
  constructor(private readonly provider: PostgresProvider) {}

  async save(version: OntologyVersion): Promise<void> {
    const query = `
      INSERT INTO ontology_versions (id, ontology_id, version_number, is_published, created_at)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE SET
        ontology_id = EXCLUDED.ontology_id,
        version_number = EXCLUDED.version_number,
        is_published = EXCLUDED.is_published;
    `;
    await this.provider.query(query, [
      version.id.toString(),
      version.ontologyId.toString(),
      version.version,
      version.isPublished,
      version.createdAt,
    ]);
  }

  async findById(id: UniqueEntityId): Promise<OntologyVersion | null> {
    const query = 'SELECT * FROM ontology_versions WHERE id = $1';
    const result = await this.provider.query(query, [id.toString()]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return OntologyVersion.reconstruct({
      ontologyId: new UniqueEntityId(row.ontology_id),
      version: row.version_number,
      isPublished: row.is_published,
      createdAt: row.created_at,
    }, new UniqueEntityId(row.id));
  }

  async findByOntologyId(ontologyId: UniqueEntityId): Promise<OntologyVersion[]> {
    const query = 'SELECT * FROM ontology_versions WHERE ontology_id = $1';
    const result = await this.provider.query(query, [ontologyId.toString()]);

    return result.rows.map((row: any) => OntologyVersion.reconstruct({
      ontologyId: new UniqueEntityId(row.ontology_id),
      version: row.version_number,
      isPublished: row.is_published,
      createdAt: row.created_at,
    }, new UniqueEntityId(row.id)));
  }
}
