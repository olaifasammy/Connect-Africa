import { AuditLogger } from '../../../../shared/infrastructure/logging/AuditLogger';
import { Prompt } from '../../domain/entities/Prompt';

export class PromptAuditHelper {
  static logPromptChange(prompt: Prompt, action: 'CREATE' | 'UPDATE' | 'ROLLBACK'): void {
    AuditLogger.log({
      user: 'system',
      action: `PROMPT_${action}`,
      resource: `Prompt:${prompt.id}`,
      status: 'SUCCESS'
    });
  }
}
