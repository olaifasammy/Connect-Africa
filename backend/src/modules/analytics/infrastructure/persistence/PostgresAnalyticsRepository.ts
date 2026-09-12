import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IAnalyticsRepository, AnalyticsFilters } from '../../domain/repositories/IAnalyticsRepository';
import { SystemMetric } from '../../domain/entities/SystemMetric';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

@provide('IAnalyticsRepository', true)
@injectable()
export class PostgresAnalyticsRepository implements IAnalyticsRepository {
  constructor(@inject('PostgresProvider') private readonly db: PostgresProvider) {}

  async save(metric: SystemMetric): Promise<void> {
    await this.db.query(
      'INSERT INTO system_metrics (id, event_name, source_context, timestamp, metadata) VALUES ($1, $2, $3, $4, $5)',
      [metric.id.toString(), metric.eventName, metric.sourceContext, metric.timestamp, JSON.stringify(metric.metadata)]
    );
    AuditLogger.log({
      user: 'system',
      action: 'SAVE_METRIC',
      resource: metric.id.toString(),
      status: 'SUCCESS'
    });
  }

  async getMetricsByContext(context: string, filters?: AnalyticsFilters): Promise<SystemMetric[]> {
    let query = 'SELECT * FROM system_metrics WHERE source_context = $1';
    const params: any[] = [context];
    
    if (filters?.startDate) {
        params.push(filters.startDate);
        query += ` AND timestamp >= $${params.length}`;
    }
    if (filters?.endDate) {
        params.push(filters.endDate);
        query += ` AND timestamp <= $${params.length}`;
    }

    const result = await this.db.query(query, params);
    
    return result.rows.map((row: any) => SystemMetric.reconstitute({
        id: new UniqueEntityId(row.id),
        eventName: row.event_name,
        sourceContext: row.source_context,
        timestamp: new Date(row.timestamp),
        metadata: row.metadata
    }));
  }
}
