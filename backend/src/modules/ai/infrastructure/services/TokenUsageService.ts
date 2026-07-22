import { injectable, inject } from 'inversify';
import { ITokenUsageService } from '@modules/ai/domain/services/TokenUsageService';
import { ITokenUsageRepository } from '@modules/ai/domain/services/ITokenUsageRepository';
import { IAuditLogger } from '@modules/auth/public';

@injectable()
export class TokenUsageService implements ITokenUsageService {
  constructor(
    @inject('ITokenUsageRepository') private readonly repo: ITokenUsageRepository,
    @inject('IAuditLogger') private readonly audit: IAuditLogger,
  ) {}

  async recordUsage(providerId: string, tokens: number): Promise<void> {
    // Persist usage for reporting / cost‑control
    await this.repo.save({ providerId, tokens, timestamp: new Date() });
    // Also log for observability
    await this.audit.log({
      user: 'system',
      action: 'TOKEN_USAGE',
      resource: providerId,
      status: 'SUCCESS',
    });
  }
}
