import { ContainerModule, interfaces } from 'inversify';
import { AuditController } from './interfaces/controllers/AuditController';
import { RecordAuditCommandHandler } from './application/handlers/RecordAuditCommandHandler';
import { SearchAuditQueryHandler } from './application/handlers/SearchAuditQueryHandler';
import { AuditRecordingService } from './domain/services/AuditRecordingService';
import { AuditSearchService } from './domain/services/AuditSearchService';

export const auditContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(AuditController).toSelf();
  bind('RecordAuditCommandHandler').to(RecordAuditCommandHandler);
  bind('SearchAuditQueryHandler').to(SearchAuditQueryHandler);
  bind('AuditRecordingService').to(AuditRecordingService);
  bind('AuditSearchService').to(AuditSearchService);
});
