import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';

@provide(GraphMetrics, true)
@injectable()
export class GraphMetrics {
  constructor(
    @inject('IMetricsProvider') private readonly metricsProvider: IMetricsProvider
  ) {}

  incrementNodesCreated() {
    this.metricsProvider.incrementCounter('graph_nodes_created_total', { status: 'success' });
  }

  incrementNodesUpdated() {
    this.metricsProvider.incrementCounter('graph_nodes_updated_total', { status: 'success' });
  }

  incrementNodesDeleted() {
    this.metricsProvider.incrementCounter('graph_nodes_deleted_total', { status: 'success' });
  }

  incrementEdgesCreated() {
    this.metricsProvider.incrementCounter('graph_edges_created_total', { status: 'success' });
  }

  incrementEdgesUpdated() {
    this.metricsProvider.incrementCounter('graph_edges_updated_total', { status: 'success' });
  }

  incrementEdgesDeleted() {
    this.metricsProvider.incrementCounter('graph_edges_deleted_total', { status: 'success' });
  }
}
