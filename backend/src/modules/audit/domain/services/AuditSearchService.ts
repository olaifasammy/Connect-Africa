import { inject, injectable } from 'inversify';
import { IAuditRepository } from '../repositories/IAuditRepository';
import { AuditSearchCriteria } from '../repositories/AuditSearchCriteria';
import { AuditEntry } from '../aggregates/AuditEntry';

@injectable()
export class AuditSearchService {
  constructor(
    @inject('IAuditRepository') private readonly auditRepository: IAuditRepository
  ) {}

  async search(criteria: AuditSearchCriteria): Promise<AuditEntry[]> {
    return await this.auditRepository.search(criteria);
  }
}
