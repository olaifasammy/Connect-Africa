import { IAiGateway, IAiRequest, IAiResponse } from '../../domain/interfaces/IAiGateway';
import { AuditLogger } from '../../../../shared/infrastructure/logging/AuditLogger';

export class GeminiProvider implements IAiGateway {
  async processRequest(request: IAiRequest): Promise<IAiResponse> {
    try {
      if (!request.prompt) throw new Error('Prompt is required');
      
      return {
        content: `Gemini processed: ${request.prompt}`,
        tokensUsed: 10,
        tokenCount: 10,
        provider: 'gemini',
      };
    } catch (error) {
      AuditLogger.log({
        user: 'system',
        action: 'AI_PROCESS_REQUEST',
        resource: 'GeminiProvider',
        status: 'FAILURE'
      });
      throw new Error(`AI Provider Failure: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }
}
