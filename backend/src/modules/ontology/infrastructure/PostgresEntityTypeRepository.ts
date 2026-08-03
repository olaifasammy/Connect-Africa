import { IEntityTypeRepository } from '../domain/repositories/IEntityTypeRepository';
import { EntityType } from '../domain/entities/EntityType';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { OntologyId } from '../domain/value-objects/OntologyId';

export class PostgresEntityTypeRepository implements IEntityTypeRepository {
  constructor(private readonly provider: PostgresProvider) {}

  async save(entityType: EntityType): Promise<void> {
    const query = `
      INSERT INTO entity_types (id, ontology_id, name, description)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE SET
        ontology_id = EXCLUDED.ontology_id,
        name = EXCLUDED.name,
        description = EXCLUDED.description;
    `;
    await this.provider.query(query, [
      entityType.id.toString(),
      entityType.ontologyId.toString(),
      entityType.name,
      entityType.description,
    ]);
  }

  async findById(id: UniqueEntityId): Promise<EntityType | null> {
    const query = 'SELECT * FROM entity_types WHERE id = $1';
    const result = await this.provider.query(query, [id.toString()]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return EntityType.reconstruct({
      ontologyId: OntologyId.create(row.ontology_id),
      name: row.name,
      description: row.description,
    }, new UniqueEntityId(row.id));
  }

  async findByName(name: string): Promise<EntityType | null> {
    const query = 'SELECT * FROM entity_types WHERE name = $1';
    const result = await this.provider.query(query, [name]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return EntityType.reconstruct({
      ontologyId: OntologyId.create(row.ontology_id),
      name: row.name,
      description: row.description,
    }, new UniqueEntityId(row.id));
  }

  async delete(id: UniqueEntityId): Promise<void> {
    const query = 'DELETE FROM entity_types WHERE id = $1';
    await this.provider.query(query, [id.toString()]);
  }
}
