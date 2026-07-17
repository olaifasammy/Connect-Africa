import { AuditSearchCriteria } from '../../domain/repositories/AuditSearchCriteria';

export class SearchAuditQuery {
  constructor(public readonly criteria: AuditSearchCriteria) {}
}
