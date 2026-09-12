import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IOntologyVersionRepository } from '../domain/repositories/IOntologyVersionRepository';
import { OntologyVersion } from '../domain/entities/OntologyVersion';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

interface OntologyVersionRow {
  id: string;
  ontology_id: string;
  version_number: number | string;
  is_published: boolean;
  created_at: Date | string;
}

@provide('IOntologyVersionRepository', true)
@injectable()
export class PostgresOntologyVersionRepository
  implements IOntologyVersionRepository
{
  constructor(
    private readonly provider: PostgresProvider,
  ) {}

  async save(
    version: OntologyVersion,
  ): Promise<void> {
    const versionNumber = Number(
      version.version,
    );

    if (
      !Number.isInteger(versionNumber) ||
      versionNumber < 1
    ) {
      throw new Error(
        'Cannot persist an invalid ontology version number.',
      );
    }

    await this.provider.query(
      `
        INSERT INTO ontology_versions (
          id,
          ontology_id,
          version_number,
          is_published,
          created_at
        )
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO UPDATE
        SET
          is_published = EXCLUDED.is_published
      `,
      [
        version.id.toString(),
        version.ontologyId.toString(),
        versionNumber,
        version.isPublished,
        version.createdAt,
      ],
    );
  }

  async findById(
    id: UniqueEntityId,
  ): Promise<OntologyVersion | null> {
    const result =
      await this.provider.query<OntologyVersionRow>(
        `
          SELECT
            id,
            ontology_id,
            version_number,
            is_published,
            created_at
          FROM ontology_versions
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

  async findByOntologyId(
    ontologyId: UniqueEntityId,
  ): Promise<OntologyVersion[]> {
    const result =
      await this.provider.query<OntologyVersionRow>(
        `
          SELECT
            id,
            ontology_id,
            version_number,
            is_published,
            created_at
          FROM ontology_versions
          WHERE ontology_id = $1
          ORDER BY version_number ASC
        `,
        [ontologyId.toString()],
      );

    return result.rows.map((row) =>
      this.mapRow(row),
    );
  }

  private mapRow(
    row: OntologyVersionRow,
  ): OntologyVersion {
    const version = Number(
      row.version_number,
    );

    if (
      !Number.isInteger(version) ||
      version < 1
    ) {
      throw new Error(
        `Invalid persisted ontology version ${row.id}.`,
      );
    }

    const createdAt = new Date(
      row.created_at,
    );

    if (
      Number.isNaN(
        createdAt.getTime(),
      )
    ) {
      throw new Error(
        `Invalid created_at for ontology version ${row.id}.`,
      );
    }

    return OntologyVersion.reconstruct(
      {
        ontologyId:
          new UniqueEntityId(
            row.ontology_id,
          ),
        version,
        isPublished:
          row.is_published,
        createdAt,
      },
      new UniqueEntityId(row.id),
    );
  }
}