import { IAIRequestRepository } from '../../domain/repositories/IAIRequestRepository';
import { AIRequest } from '../../domain/entities/AIRequest';

export class PostgresAIRequestRepository implements IAIRequestRepository {
  async save(request: AIRequest): Promise<void> {
    // In production, implement actual SQL query: 
    // await db.query('INSERT INTO ai_requests ...', [request.id, request.prompt, ...]);
  }

  async findById(id: string): Promise<AIRequest | null> {
    // In production, implement actual SQL query
    return null;
  }
}
