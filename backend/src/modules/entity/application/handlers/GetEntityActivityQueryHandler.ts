import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetEntityActivityQuery } from '../queries/GetEntityActivityQuery';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

export interface EntityActivityResponse {
  id: string;
  action: string;
  entityId: string;
  entityName: string;
  actor: { displayName: string; avatarUrl?: string };
  timestamp: Date;
}

@provide(GetEntityActivityQueryHandler, true)
@injectable()
export class GetEntityActivityQueryHandler
  implements IQueryHandler<GetEntityActivityQuery, EntityActivityResponse[]>
{
  constructor(
    @inject(PostgresProvider)
    private readonly postgresProvider: PostgresProvider,
  ) {}

  async handle(
    query: GetEntityActivityQuery,
  ): Promise<EntityActivityResponse[]> {
    const limit = query.limit || 20;

    try {
      const result = await this.postgresProvider.query<{
        id: string;
        action: string;
        resource_id: string;
        entity_name: string | null;
        display_name: string | null;
        avatar_url: string | null;
        timestamp: Date;
      }>(
        `
          SELECT ae.id, ae.action, ae.resource_id, ae.timestamp,
                 e.name as entity_name,
                 up.display_name, up.avatar_url
          FROM audit_entries ae
          LEFT JOIN entities e ON ae.resource_id = e.id
          LEFT JOIN user_profiles up ON ae.actor_id = up.user_id
          WHERE ae.resource_type = 'ENTITY'
          ORDER BY ae.timestamp DESC
          LIMIT $1
        `,
        [limit]
      );

      return result.rows.map((row) => ({
        id: row.id,
        action: row.action,
        entityId: row.resource_id,
        entityName: row.entity_name || 'Deleted Entity',
        actor: {
          displayName: row.display_name || 'System Moderator',
          avatarUrl: row.avatar_url || undefined,
        },
        timestamp: new Date(row.timestamp),
      }));
    } catch {
      return [];
    }
  }
}
