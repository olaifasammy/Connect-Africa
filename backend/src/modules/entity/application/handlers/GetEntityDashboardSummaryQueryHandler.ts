import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetEntityDashboardSummaryQuery } from '../queries/GetEntityDashboardSummaryQuery';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EntityQualityCalculator } from '@modules/entity/domain/services/EntityQualityCalculator';

export interface EntityDashboardSummaryResponse {
  totalEntities: number;
  totalEntitiesGrowth: number;
  verifiedEntities: number;
  verifiedEntitiesPercentage: number;
  pendingVerification: number;
  pendingVerificationGrowth: number;
  entitiesUpdated: number;
  entitiesUpdatedGrowth: number;
  entitiesMerged: number;
  entitiesMergedGrowth: number;
  qualityScore: number;
  qualityScoreStatus: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

@provide(GetEntityDashboardSummaryQueryHandler, true)
@injectable()
export class GetEntityDashboardSummaryQueryHandler
  implements IQueryHandler<GetEntityDashboardSummaryQuery, EntityDashboardSummaryResponse>
{
  constructor(
    @inject(PostgresProvider)
    private readonly postgresProvider: PostgresProvider,
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,
  ) {}

  async handle(
    _query: GetEntityDashboardSummaryQuery,
  ): Promise<EntityDashboardSummaryResponse> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // 1. Total Entities and Growth
    const totalResult = await this.postgresProvider.query<{ count: string }>(
      'SELECT COUNT(*) as count FROM entities'
    );
    const totalEntities = parseInt(totalResult.rows[0]?.count || '0', 10);

    const totalGrowthResult = await this.postgresProvider.query<{ count: string }>(
      'SELECT COUNT(*) as count FROM entities WHERE created_at >= $1',
      [sevenDaysAgo]
    );
    const totalEntitiesGrowth = parseInt(totalGrowthResult.rows[0]?.count || '0', 10);

    // 2. Verified Entities
    const verifiedResult = await this.postgresProvider.query<{ count: string }>(
      `SELECT COUNT(*) as count FROM entities WHERE verification_status IN ('COMMUNITY_VERIFIED', 'OFFICIALLY_VERIFIED')`
    );
    const verifiedEntities = parseInt(verifiedResult.rows[0]?.count || '0', 10);
    const verifiedEntitiesPercentage = totalEntities > 0
      ? Math.round((verifiedEntities / totalEntities) * 1000) / 10
      : 0;

    // 3. Pending Verification
    const pendingResult = await this.postgresProvider.query<{ count: string }>(
      `SELECT COUNT(*) as count FROM entities WHERE verification_status = 'UNVERIFIED' OR status = 'PENDING_REVIEW'`
    );
    const pendingVerification = parseInt(pendingResult.rows[0]?.count || '0', 10);

    const pendingGrowthResult = await this.postgresProvider.query<{ count: string }>(
      `SELECT COUNT(*) as count FROM entities WHERE (verification_status = 'UNVERIFIED' OR status = 'PENDING_REVIEW') AND created_at >= $1`,
      [sevenDaysAgo]
    );
    const pendingVerificationGrowth = parseInt(pendingGrowthResult.rows[0]?.count || '0', 10);

    // 4. Entities Updated
    const updatedResult = await this.postgresProvider.query<{ count: string }>(
      `SELECT COUNT(*) as count FROM entities WHERE updated_at >= $1`,
      [sevenDaysAgo]
    );
    const entitiesUpdated = parseInt(updatedResult.rows[0]?.count || '0', 10);
    const entitiesUpdatedGrowth = entitiesUpdated; // Delta for the week is the current count of updates this week

    // 5. Entities Merged (from audit logs)
    const mergedResult = await this.postgresProvider.query<{ count: string }>(
      `SELECT COUNT(*) as count FROM audit_entries WHERE action = 'ENTITY_MERGED'`
    );
    const entitiesMerged = parseInt(mergedResult.rows[0]?.count || '0', 10);

    const mergedGrowthResult = await this.postgresProvider.query<{ count: string }>(
      `SELECT COUNT(*) as count FROM audit_entries WHERE action = 'ENTITY_MERGED' AND timestamp >= $1`,
      [sevenDaysAgo]
    );
    const entitiesMergedGrowth = parseInt(mergedGrowthResult.rows[0]?.count || '0', 10);

    // 6. Quality Score & Status (calculated dynamically from a sample of last 500 updated entities)
    const sampleSize = 500;
    const sampleResult = await this.entityRepository.findAll({
      strategy: 'offset',
      page: 1,
      limit: sampleSize,
    });

    let totalScore = 0;
    const items = sampleResult.items || [];
    if (items.length > 0) {
      for (const entity of items) {
        totalScore += EntityQualityCalculator.calculate(entity);
      }
    }

    const averageQualityScore = items.length > 0
      ? Math.round(totalScore / items.length)
      : 96; // Fallback to a high default standard quality score if empty

    let qualityScoreStatus: 'Excellent' | 'Good' | 'Fair' | 'Poor' = 'Excellent';
    if (averageQualityScore < 50) {
      qualityScoreStatus = 'Poor';
    } else if (averageQualityScore < 70) {
      qualityScoreStatus = 'Fair';
    } else if (averageQualityScore < 90) {
      qualityScoreStatus = 'Good';
    }

    return {
      totalEntities,
      totalEntitiesGrowth,
      verifiedEntities,
      verifiedEntitiesPercentage,
      pendingVerification,
      pendingVerificationGrowth,
      entitiesUpdated,
      entitiesUpdatedGrowth,
      entitiesMerged,
      entitiesMergedGrowth,
      qualityScore: averageQualityScore,
      qualityScoreStatus,
    };
  }
}
