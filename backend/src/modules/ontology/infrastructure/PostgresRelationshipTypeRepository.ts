import { IRelationshipTypeRepository } from '../domain/repositories/IRelationshipTypeRepository';
import { RelationshipType } from '../domain/entities/RelationshipType';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { OntologyId } from '../domain/value-objects/OntologyId';

export class PostgresRelationshipTypeRepository implements IRelationshipTypeRepository {
  constructor(private readonly provider: PostgresProvider) {}

  async save(relationshipType: RelationshipType): Promise<void> {
    const query = `
      INSERT INTO relationship_types (id, ontology_id, name, description, source_entity_type_id, target_entity_type_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO UPDATE SET
        ontology_id = EXCLUDED.ontology_id,
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        source_entity_type_id = EXCLUDED.source_entity_type_id,
        target_entity_type_id = EXCLUDED.target_entity_type_id;
    `;
    await this.provider.query(query, [
      relationshipType.id.toString(),
      relationshipType.ontologyId.toString(),
      relationshipType.name,
      relationshipType.description,
      relationshipType.sourceEntityTypeId.toString(),
      relationshipType.targetEntityTypeId.toString(),
    ]);
  }

  async findById(id: UniqueEntityId): Promise<RelationshipType | null> {
    const query = 'SELECT * FROM relationship_types WHERE id = $1';
    const result = await this.provider.query(query, [id.toString()]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return RelationshipType.reconstruct({
      ontologyId: OntologyId.create(row.ontology_id),
      name: row.name,
      description: row.description,
      sourceEntityTypeId: new UniqueEntityId(row.source_entity_type_id),
      targetEntityTypeId: new UniqueEntityId(row.target_entity_type_id),
    }, new UniqueEntityId(row.id));
  }

  async findByName(name: string): Promise<RelationshipType | null> {
    const query = 'SELECT * FROM relationship_types WHERE name = $1';
    const result = await this.provider.query(query, [name]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return RelationshipType.reconstruct({
      ontologyId: OntologyId.create(row.ontology_id),
      name: row.name,
      description: row.description,
      sourceEntityTypeId: new UniqueEntityId(row.source_entity_type_id),
      targetEntityTypeId: new UniqueEntityId(row.target_entity_type_id),
    }, new UniqueEntityId(row.id));
  }

  async delete(id: UniqueEntityId): Promise<void> {
    const query = 'DELETE FROM relationship_types WHERE id = $1';
    await this.provider.query(query, [id.toString()]);
  }
}
