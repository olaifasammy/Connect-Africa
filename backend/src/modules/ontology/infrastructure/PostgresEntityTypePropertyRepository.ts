import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import { IEntityTypePropertyRepository } from '../domain/repositories/IEntityTypePropertyRepository';
import { EntityTypeProperty } from '../domain/entities/EntityTypeProperty';
import { OntologyId } from '../domain/value-objects/OntologyId';
import { PropertyDefinition } from '../domain/value-objects/PropertyDefinition';
import { CardinalityRule } from '../domain/value-objects/CardinalityRule';
import { DomainError } from '../domain/errors/DomainError';

interface EntityTypePropertyRow {
  id: string;
  entity_type_id: string;
  ontology_id: string;
  name: string;
  data_type: string;
  min_cardinality: number | string;
  max_cardinality: number | string | null;
  required: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

@provide(
  'IEntityTypePropertyRepository',
  true,
)
@injectable()
export class PostgresEntityTypePropertyRepository
  implements IEntityTypePropertyRepository
{
  constructor(
    private readonly provider: PostgresProvider,
  ) {}

  async findById(
    id: UniqueEntityId,
  ): Promise<EntityTypeProperty | null> {
    const result =
      await this.provider.query<EntityTypePropertyRow>(
        `
          SELECT
            id,
            entity_type_id,
            ontology_id,
            name,
            data_type,
            min_cardinality,
            max_cardinality,
            required,
            created_at,
            updated_at
          FROM entity_type_properties
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

  async findByEntityTypeId(
    entityTypeId: UniqueEntityId,
  ): Promise<EntityTypeProperty[]> {
    const result =
      await this.provider.query<EntityTypePropertyRow>(
        `
          SELECT
            id,
            entity_type_id,
            ontology_id,
            name,
            data_type,
            min_cardinality,
            max_cardinality,
            required,
            created_at,
            updated_at
          FROM entity_type_properties
          WHERE entity_type_id = $1
          ORDER BY name ASC, id ASC
        `,
        [entityTypeId.toString()],
      );

    return result.rows.map((row) =>
      this.mapRow(row),
    );
  }

  async findByName(
    entityTypeId: UniqueEntityId,
    name: string,
  ): Promise<EntityTypeProperty | null> {
    const normalizedName = name?.trim();

    if (!normalizedName) {
      throw new DomainError(
        'Entity Type Property name cannot be empty.',
      );
    }

    const result =
      await this.provider.query<EntityTypePropertyRow>(
        `
          SELECT
            id,
            entity_type_id,
            ontology_id,
            name,
            data_type,
            min_cardinality,
            max_cardinality,
            required,
            created_at,
            updated_at
          FROM entity_type_properties
          WHERE entity_type_id = $1
            AND name = $2
          LIMIT 1
        `,
        [
          entityTypeId.toString(),
          normalizedName,
        ],
      );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRow(result.rows[0]);
  }

  async save(
    property: EntityTypeProperty,
  ): Promise<void> {
    try {
      await this.provider.query(
        `
          INSERT INTO entity_type_properties (
            id,
            entity_type_id,
            ontology_id,
            name,
            data_type,
            min_cardinality,
            max_cardinality,
            required,
            created_at,
            updated_at
          )
          VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10
          )
          ON CONFLICT (id) DO UPDATE
          SET
            name = EXCLUDED.name,
            data_type = EXCLUDED.data_type,
            min_cardinality = EXCLUDED.min_cardinality,
            max_cardinality = EXCLUDED.max_cardinality,
            required = EXCLUDED.required,
            updated_at = EXCLUDED.updated_at
        `,
        [
          property.id.toString(),
          property.entityTypeId.toString(),
          property.ontologyId.toString(),
          property.name,
          property.definition.dataType,
          property.cardinality.min,
          property.cardinality.max,
          property.required,
          property.createdAt,
          property.updatedAt,
        ],
      );
    } catch (error: any) {
      if (error?.code === '23505') {
        throw new DomainError(
          `Entity Type Property already exists: ${property.name}.`,
        );
      }

      throw error;
    }
  }

  async delete(
    id: UniqueEntityId,
  ): Promise<void> {
    const result =
      await this.provider.query(
        `
          DELETE FROM entity_type_properties
          WHERE id = $1
        `,
        [id.toString()],
      );

    if ((result.rowCount ?? 0) === 0) {
      throw new DomainError(
        `Entity Type Property with ID ${id.toString()} was not found.`,
      );
    }
  }

  private mapRow(
    row: EntityTypePropertyRow,
  ): EntityTypeProperty {
    const minCardinality = Number(
      row.min_cardinality,
    );

    const maxCardinality =
      row.max_cardinality === null
        ? null
        : Number(row.max_cardinality);

    if (
      !Number.isInteger(minCardinality) ||
      minCardinality < 0
    ) {
      throw new DomainError(
        `Invalid minimum cardinality for Entity Type Property ${row.id}.`,
      );
    }

    if (
      maxCardinality !== null &&
      (!Number.isInteger(maxCardinality) ||
        maxCardinality < minCardinality)
    ) {
      throw new DomainError(
        `Invalid maximum cardinality for Entity Type Property ${row.id}.`,
      );
    }

    if (
      typeof row.required !== 'boolean'
    ) {
      throw new DomainError(
        `Invalid required flag for Entity Type Property ${row.id}.`,
      );
    }

    if (!row.name?.trim()) {
      throw new DomainError(
        `Invalid empty name for Entity Type Property ${row.id}.`,
      );
    }

    const createdAt = new Date(
      row.created_at,
    );

    const updatedAt = new Date(
      row.updated_at,
    );

    if (
      Number.isNaN(createdAt.getTime()) ||
      Number.isNaN(updatedAt.getTime())
    ) {
      throw new DomainError(
        `Invalid timestamp for Entity Type Property ${row.id}.`,
      );
    }

    return EntityTypeProperty.reconstruct(
      {
        entityTypeId:
          new UniqueEntityId(
            row.entity_type_id,
          ),
        ontologyId:
          OntologyId.create(
            row.ontology_id,
          ),
        name: row.name,
        definition:
          PropertyDefinition.create(
            row.data_type,
          ),
        cardinality:
          CardinalityRule.create({
            min: minCardinality,
            max: maxCardinality,
          }),
        required: row.required,
        createdAt,
        updatedAt,
      },
      new UniqueEntityId(row.id),
    );
  }
}