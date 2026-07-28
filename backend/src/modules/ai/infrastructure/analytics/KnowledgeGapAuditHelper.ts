import { AuditLogger } from '../../../../shared/infrastructure/logging/AuditLogger';
import { KnowledgeGap } from '../../domain/entities/KnowledgeGap';

export class KnowledgeGapAuditHelper {
  static logGap(gap: KnowledgeGap): void {
    AuditLogger.log({
      user: 'system',
      action: 'KNOWLEDGE_GAP_CREATED',
      resource: `KnowledgeGap:${gap.id}`,
      status: 'SUCCESS'
    });
  }
}
