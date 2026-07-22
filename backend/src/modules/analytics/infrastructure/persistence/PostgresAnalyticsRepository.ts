import { injectable, inject } from 'inversify';
import { IAnalyticsRepository } from '../../domain/repositories/IAnalyticsRepository';
import { SystemMetric } from '../../domain/entities/SystemMetric';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

@injectable()
export class PostgresAnalyticsRepository implements IAnalyticsRepository {
  constructor(@inject('PostgresProvider') private readonly db: PostgresProvider) {}

  async save(metric: SystemMetric): Promise<void> {
    await this.db.query(
      'INSERT INTO system_metrics (id, event_name, source_context, timestamp, metadata) VALUES ($1, $2, $3, $4, $5)',
      [metric.id.toString(), metric.eventName, metric.sourceContext, metric.timestamp, JSON.stringify(metric.metadata)]
    );
  }

  async getMetricsByContext(context: string): Promise<SystemMetric[]> {
    const result = await this.db.query('SELECT * FROM system_metrics WHERE source_context = $1', [context]);
    return result.rows.map((row: any) => SystemMetric.create({
        eventName: row.event_name,
        sourceContext: row.source_context,
        metadata: row.metadata
    }));
  }
}
