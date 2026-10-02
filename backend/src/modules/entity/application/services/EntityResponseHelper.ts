import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { Entity } from '../../domain/entities/Entity';
import { EntityResponse } from '../dto/EntityResponse';
import { EntityQualityCalculator } from '../../domain/services/EntityQualityCalculator';

@provide(EntityResponseHelper, true)
@injectable()
export class EntityResponseHelper {
  constructor(
    @inject(PostgresProvider)
    private readonly postgresProvider: PostgresProvider,
  ) {}

  public async enrich(entities: Entity[]): Promise<EntityResponse[]> {
    if (entities.length === 0) {
      return [];
    }

    const ids = entities.map((e) => e.entityId.value);

    // Batch query the last editor user profiles for these entities
    let userMap: Record<string, { displayName: string; avatarUrl?: string }> = {};

    try {
      const result = await this.postgresProvider.query<{
        resource_id: string;
        display_name: string | null;
        avatar_url: string | null;
      }>(
        `
          WITH last_audit AS (
            SELECT DISTINCT ON (resource_id) resource_id, actor_id
            FROM audit_entries
            WHERE resource_type = 'ENTITY' AND resource_id = ANY($1)
            ORDER BY resource_id, timestamp DESC
          )
          SELECT la.resource_id, up.display_name, up.avatar_url
          FROM last_audit la
          LEFT JOIN user_profiles up ON la.actor_id = up.user_id
        `,
        [ids]
      );

      for (const row of result.rows) {
        userMap[row.resource_id] = {
          displayName: row.display_name || 'System Moderator',
          avatarUrl: row.avatar_url || undefined,
        };
      }
    } catch {
      // Graceful fallback if database schema is older
    }

    return entities.map((entity) => {
      const id = entity.entityId.value;
      const qualityScore = EntityQualityCalculator.calculate(entity);
      const updatedBy = userMap[id] || { displayName: 'System Moderator' };

      return {
        id,
        name: entity.name.value,
        type: entity.type,
        slug: entity.metadata.slug!,
        description: entity.metadata.description,
        source: entity.metadata.source,
        tags: entity.metadata.tags,
        status: entity.status,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        qualityScore,
        updatedBy,
      };
    });
  }
}
