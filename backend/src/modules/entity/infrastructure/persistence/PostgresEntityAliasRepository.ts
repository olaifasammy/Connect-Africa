import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';

import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

import { IEntityAliasRepository } from '@modules/entity/domain/repositories/IEntityAliasRepository';
import { EntityAlias } from '@modules/entity/domain/entities/EntityAlias';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { AliasName } from '@modules/entity/domain/value-objects/EntityValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(PostgresEntityAliasRepository, true)
@injectable()
export class PostgresEntityAliasRepository
  implements IEntityAliasRepository
{
  constructor(
    private readonly provider: PostgresProvider
  ) {}

  async save(alias: EntityAlias): Promise<void> {
    await this.provider.query(
      `
        INSERT INTO entity_aliases (
          id,
          entity_id,
          alias,
          created_at
        )
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id)
        DO UPDATE SET
          alias = EXCLUDED.alias
      `,
      [
        alias.id.toString(),
        alias.entityId.value,
        alias.name.value,
        alias.createdAt,
      ]
    );
  }

  async delete(alias: EntityAlias): Promise<void> {
    await this.provider.query(
      `
        DELETE FROM entity_aliases
        WHERE id = $1
      `,
      [alias.id.toString()]
    );
  }

  async findByEntityId(entityId: EntityId): Promise<EntityAlias[]> {
    const result = await this.provider.query<{
      id: string;
      entity_id: string;
      alias: string;
      created_at: Date;
    }>(
      `
        SELECT
          id,
          entity_id,
          alias,
          created_at
        FROM entity_aliases
        WHERE entity_id = $1
        ORDER BY alias ASC, id ASC
      `,
      [entityId.value]
    );

    return result.rows.map(
      (row) =>
        new EntityAlias(
          {
            entityId: EntityId.create(row.entity_id),
            name: AliasName.create(row.alias),
            createdAt: new Date(row.created_at),
          },
          new UniqueEntityId(row.id)
        )
    );
  }
}