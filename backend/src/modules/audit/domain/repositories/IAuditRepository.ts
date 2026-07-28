import { AuditEntry } from '../aggregates/AuditEntry';
import { AuditSearchCriteria } from './AuditSearchCriteria';

export interface IAuditRepository {
  log(entry: AuditEntry): Promise<void>;
  search(criteria: AuditSearchCriteria): Promise<AuditEntry[]>;
  findById(id: string): Promise<AuditEntry | null>;
}
