import { inject, injectable } from 'inversify';
import { IAuditRepository } from '../repositories/IAuditRepository';
import { AuditEntry } from '../aggregates/AuditEntry';

@injectable()
export class AuditHistoryService {
  constructor(
    @inject('IAuditRepository') private readonly auditRepository: IAuditRepository
  ) {}

  async getResourceHistory(resourceId: string): Promise<AuditEntry[]> {
    return await this.auditRepository.search({ resourceId });
  }
}
