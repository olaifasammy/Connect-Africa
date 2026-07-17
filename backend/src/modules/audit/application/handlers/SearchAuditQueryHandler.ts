import { inject, injectable } from 'inversify';
import { SearchAuditQuery } from '../queries/SearchAuditQuery';
import { AuditSearchService } from '../../domain/services/AuditSearchService';
import { AuditEntryResponseDto } from '../dto/AuditEntryResponseDto';

@injectable()
export class SearchAuditQueryHandler {
  constructor(
    @inject('AuditSearchService') private readonly auditSearchService: AuditSearchService
  ) {}

  async execute(query: SearchAuditQuery): Promise<AuditEntryResponseDto[]> {
    const entries = await this.auditSearchService.search(query.criteria);
    
    return entries.map(entry => ({
      id: entry.id.toString(),
      correlationId: entry.correlationId.getProps().value,
      actor: {
        id: entry.actor.id.toString(),
        type: entry.actor.actorType
      },
      resource: {
        id: entry.resource.resourceId.toString(),
        type: entry.resource.type
      },
      action: entry.action,
      timestamp: entry.timestamp.getProps().value.toISOString(),
      metadata: entry.metadata.map(m => ({
        key: m.key,
        value: m.value
      }))
    }));
  }
}
