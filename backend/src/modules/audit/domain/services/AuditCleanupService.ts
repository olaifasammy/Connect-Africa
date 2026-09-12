import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IAuditRepository } from '../repositories/IAuditRepository';
import { AuditRetentionPolicy } from '../policies/AuditRetentionPolicy';
import { AuditEntry } from '../aggregates/AuditEntry';

@provide(AuditCleanupService, true)
@injectable()
export class AuditCleanupService {
  constructor(
    @inject('IAuditRepository') private readonly auditRepository: IAuditRepository
  ) {}

  async getExpiredEntries(): Promise<AuditEntry[]> {
    const allEntries = await this.auditRepository.search({});
    return allEntries.filter(entry => AuditRetentionPolicy.isExpired(entry));
  }
}
