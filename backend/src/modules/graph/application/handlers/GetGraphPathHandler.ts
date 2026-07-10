import { GetGraphPathQuery } from '../queries/GetGraphPathQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class GetGraphPathHandler {
  constructor(private readonly graphRepository: IGraphRepository) {}

  async handle(query: GetGraphPathQuery, userId: string, ipAddress: string): Promise<any> {
    try {
      const result = await this.graphRepository.findShortestPath(query.startEntityId, query.endEntityId);
      AuditLogger.log({ user: userId, action: 'GET_GRAPH_PATH', resource: 'GRAPH', status: 'SUCCESS', ipAddress });
      return result;
    } catch (error) {
      AuditLogger.log({ user: userId, action: 'GET_GRAPH_PATH', resource: 'GRAPH', status: 'FAILURE', ipAddress });
      throw error;
    }
  }
}
