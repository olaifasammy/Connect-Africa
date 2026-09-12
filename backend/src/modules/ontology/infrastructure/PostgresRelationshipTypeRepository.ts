import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IRelationshipTypeRepository } from '../domain/repositories/IRelationshipTypeRepository';
import { RelationshipType } from '../domain/entities/RelationshipType';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { OntologyId } from '../domain/value-objects/OntologyId';

interface RelationshipTypeRow {
  id: string;
  ontology_id: string;
  name: string;
  description: string | null;
  source_entity_type_id: string;
  target_entity_type_id: string;
}

@provide('IRelationshipTypeRepository', true)
@injectable()
export class PostgresRelationshipTypeRepository
  implements IRelationshipTypeRepository
{
  constructor(
    private readonly provider: PostgresProvider,
  ) {}

  async save(
    relationshipType: RelationshipType,
  ): Promise<void> {
    await this.provider.query(
      `
        INSERT INTO relationship_types (
          id,
          ontology_id,
          name,
          description,
          source_entity_type_id,
          target_entity_type_id
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE
        SET
          ontology_id = EXCLUDED.ontology_id,
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          source_entity_type_id =
            EXCLUDED.source_entity_type_id,
          target_entity_type_id =
            EXCLUDED.target_entity_type_id
      `,
      [
        relationshipType.id.toString(),
        relationshipType.ontologyId.toString(),
        relationshipType.name,
        relationshipType.description,
        relationshipType.sourceEntityTypeId.toString(),
        relationshipType.targetEntityTypeId.toString(),
      ],
    );
  }

  async findById(
    id: UniqueEntityId,
  ): Promise<RelationshipType | null> {
    const result =
      await this.provider.query<RelationshipTypeRow>(
        `
          SELECT
            id,
            ontology_id,
            name,
            description,
            source_entity_type_id,
            target_entity_type_id
          FROM relationship_types
          WHERE id = $1
          LIMIT 1
        `,
        [id.toString()],
      );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRow(result.rows[0]);
  }

  async findByName(
    name: string,
  ): Promise<RelationshipType | null> {
    const normalizedName = name?.trim();

    if (!normalizedName) {
      throw new Error(
        'Relationship Type name cannot be empty.',
      );
    }

    const result =
      await this.provider.query<RelationshipTypeRow>(
        `
          SELECT
            id,
            ontology_id,
            name,
            description,
            source_entity_type_id,
            target_entity_type_id
          FROM relationship_types
          WHERE name = $1
          ORDER BY id ASC
          LIMIT 1
        `,
        [normalizedName],
      );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRow(result.rows[0]);
  }

  async findByOntologyId(
    ontologyId: UniqueEntityId,
  ): Promise<RelationshipType[]> {
    const result =
      await this.provider.query<RelationshipTypeRow>(
        `
          SELECT
            id,
            ontology_id,
            name,
            description,
            source_entity_type_id,
            target_entity_type_id
          FROM relationship_types
          WHERE ontology_id = $1
          ORDER BY name ASC, id ASC
        `,
        [ontologyId.toString()],
      );

    return result.rows.map((row) =>
      this.mapRow(row),
    );
  }

  async delete(
    id: UniqueEntityId,
  ): Promise<void> {
    const result =
      await this.provider.query(
        `
          DELETE FROM relationship_types
          WHERE id = $1
        `,
        [id.toString()],
      );

    if ((result.rowCount ?? 0) === 0) {
      throw new Error(
        `Relationship Type with ID ${id.toString()} was not found.`,
      );
    }
  }

  private mapRow(
    row: RelationshipTypeRow,
  ): RelationshipType {
    return RelationshipType.reconstruct(
      {
        ontologyId: OntologyId.create(
          row.ontology_id,
        ),
        name: row.name,
        description: row.description ?? '',
        sourceEntityTypeId:
          new UniqueEntityId(
            row.source_entity_type_id,
          ),
        targetEntityTypeId:
          new UniqueEntityId(
            row.target_entity_type_id,
          ),
      },
      new UniqueEntityId(row.id),
    );
  }
}