import { injectable, inject } from 'inversify';
import { ITokenUsageService } from '@modules/ai/domain/services/TokenUsageService';
import { IAuditLogger } from '@modules/auth/public';

@injectable()
export class TokenUsageService implements ITokenUsageService {
  constructor(
    @inject('IAuditLogger') private readonly audit: IAuditLogger,
  ) {}

  async recordUsage(providerId: string, tokens: number): Promise<void> {
    // Also log for observability
    await this.audit.log({
      user: 'system',
      action: 'TOKEN_USAGE',
      resource: providerId,
      status: 'SUCCESS',
    });
  }
}
