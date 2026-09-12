import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';
import { Ontology } from '@modules/ontology/domain/entities/Ontology';
import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

interface OntologyRow {
  id: string;
  name: string;
  description: string | null;
  version: number | string;
  is_published: boolean;
  is_archived: boolean;
}

@provide('IOntologyRepository', true)
@injectable()
export class PostgresOntologyRepository
  implements IOntologyRepository
{
  constructor(
    private readonly postgresProvider: PostgresProvider,
  ) {}

  async save(
    ontology: Ontology,
  ): Promise<void> {
    const version =
      Number(ontology.version);

    if (
      !Number.isInteger(version) ||
      version < 1
    ) {
      throw new Error(
        `Cannot persist invalid ontology version for ontology ${ontology.id.toString()}.`,
      );
    }

    if (
      ontology.isPublished &&
      ontology.isArchived
    ) {
      throw new Error(
        `Cannot persist ontology ${ontology.id.toString()} as both published and archived.`,
      );
    }

    await this.postgresProvider.query(
      `
        INSERT INTO ontologies (
          id,
          name,
          description,
          version,
          is_published,
          is_archived
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE
        SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          version = EXCLUDED.version,
          is_published = EXCLUDED.is_published,
          is_archived = EXCLUDED.is_archived
      `,
      [
        ontology.id.toString(),
        ontology.name,
        ontology.description,
        version,
        ontology.isPublished,
        ontology.isArchived,
      ],
    );
  }

  async findById(
    id: OntologyId,
  ): Promise<Ontology | null> {
    const result =
      await this.postgresProvider.query<OntologyRow>(
        `
          SELECT
            id,
            name,
            description,
            version,
            is_published,
            is_archived
          FROM ontologies
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

  async findByIdForUpdate(
    id: OntologyId,
  ): Promise<Ontology | null> {
    const result =
      await this.postgresProvider.query<OntologyRow>(
        `
          SELECT
            id,
            name,
            description,
            version,
            is_published,
            is_archived
          FROM ontologies
          WHERE id = $1
          LIMIT 1
          FOR UPDATE
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
  ): Promise<Ontology | null> {
    const normalizedName =
      name?.trim();

    if (!normalizedName) {
      throw new Error(
        'Ontology name cannot be empty.',
      );
    }

    const result =
      await this.postgresProvider.query<OntologyRow>(
        `
          SELECT
            id,
            name,
            description,
            version,
            is_published,
            is_archived
          FROM ontologies
          WHERE name = $1
          LIMIT 1
        `,
        [normalizedName],
      );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRow(result.rows[0]);
  }

  async findAll(
    limit: number,
    offset: number,
  ): Promise<Ontology[]> {
    if (
      !Number.isInteger(limit) ||
      limit < 1
    ) {
      throw new Error(
        'Ontology list limit must be a positive integer.',
      );
    }

    if (
      !Number.isInteger(offset) ||
      offset < 0
    ) {
      throw new Error(
        'Ontology list offset must be a non-negative integer.',
      );
    }

    const result =
      await this.postgresProvider.query<OntologyRow>(
        `
          SELECT
            id,
            name,
            description,
            version,
            is_published,
            is_archived
          FROM ontologies
          ORDER BY id ASC
          LIMIT $1
          OFFSET $2
        `,
        [limit, offset],
      );

    return result.rows.map(
      (row) => this.mapRow(row),
    );
  }

  async exists(
    name: string,
  ): Promise<boolean> {
    const normalizedName =
      name?.trim();

    if (!normalizedName) {
      throw new Error(
        'Ontology name cannot be empty.',
      );
    }

    const result =
      await this.postgresProvider.query(
        `
          SELECT 1
          FROM ontologies
          WHERE name = $1
          LIMIT 1
        `,
        [normalizedName],
      );

    return (result.rowCount ?? 0) > 0;
  }

  private mapRow(
    row: OntologyRow,
  ): Ontology {
    const version =
      Number(row.version);

    if (
      !Number.isInteger(version) ||
      version < 1
    ) {
      throw new Error(
        `Invalid persisted ontology version for ontology ${row.id}.`,
      );
    }

    if (
      row.is_published &&
      row.is_archived
    ) {
      throw new Error(
        `Invalid persisted ontology state for ontology ${row.id}: published and archived cannot both be true.`,
      );
    }

    return Ontology.reconstruct(
      {
        name: row.name,
        description:
          row.description ?? '',
        version,
        isPublished:
          row.is_published,
        isArchived:
          row.is_archived,
      },
      OntologyId.create(row.id),
    );
  }
}