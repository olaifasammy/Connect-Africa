import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IEntityTypeRepository } from '../domain/repositories/IEntityTypeRepository';
import { EntityType } from '../domain/entities/EntityType';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { OntologyId } from '../domain/value-objects/OntologyId';

interface EntityTypeRow {
  id: string;
  ontology_id: string;
  name: string;
  description: string | null;
}

@provide('IEntityTypeRepository', true)
@injectable()
export class PostgresEntityTypeRepository
  implements IEntityTypeRepository
{
  constructor(
    private readonly provider: PostgresProvider,
  ) {}

  async save(
    entityType: EntityType,
  ): Promise<void> {
    await this.provider.query(
      `
        INSERT INTO entity_types (
          id,
          ontology_id,
          name,
          description
        )
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO UPDATE
        SET
          ontology_id = EXCLUDED.ontology_id,
          name = EXCLUDED.name,
          description = EXCLUDED.description
      `,
      [
        entityType.id.toString(),
        entityType.ontologyId.toString(),
        entityType.name,
        entityType.description,
      ],
    );
  }

  async findById(
    id: UniqueEntityId,
  ): Promise<EntityType | null> {
    const result =
      await this.provider.query<EntityTypeRow>(
        `
          SELECT
            id,
            ontology_id,
            name,
            description
          FROM entity_types
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
  ): Promise<EntityType | null> {
    const normalizedName = name?.trim();

    if (!normalizedName) {
      throw new Error(
        'Entity Type name cannot be empty.',
      );
    }

    const result =
      await this.provider.query<EntityTypeRow>(
        `
          SELECT
            id,
            ontology_id,
            name,
            description
          FROM entity_types
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
  ): Promise<EntityType[]> {
    const result =
      await this.provider.query<EntityTypeRow>(
        `
          SELECT
            id,
            ontology_id,
            name,
            description
          FROM entity_types
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
          DELETE FROM entity_types
          WHERE id = $1
        `,
        [id.toString()],
      );

    if ((result.rowCount ?? 0) === 0) {
      throw new Error(
        `Entity Type with ID ${id.toString()} was not found.`,
      );
    }
  }

  private mapRow(
    row: EntityTypeRow,
  ): EntityType {
    return EntityType.reconstruct(
      {
        ontologyId: OntologyId.create(
          row.ontology_id,
        ),
        name: row.name,
        description: row.description ?? '',
      },
      new UniqueEntityId(row.id),
    );
  }
}