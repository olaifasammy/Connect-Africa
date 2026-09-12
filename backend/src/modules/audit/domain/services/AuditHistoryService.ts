import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IAuditRepository } from '../repositories/IAuditRepository';
import { AuditEntry } from '../aggregates/AuditEntry';

@provide(AuditHistoryService, true)
@injectable()
export class AuditHistoryService {
  constructor(
    @inject('IAuditRepository') private readonly auditRepository: IAuditRepository
  ) {}

  async getResourceHistory(resourceId: string): Promise<AuditEntry[]> {
    return await this.auditRepository.search({ resourceId });
  }
}
