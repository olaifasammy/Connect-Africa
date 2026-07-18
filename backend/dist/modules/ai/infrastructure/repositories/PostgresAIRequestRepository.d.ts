import { IAIRequestRepository } from '../../domain/repositories/IAIRequestRepository';
import { AIRequest } from '../../domain/entities/AIRequest';
export declare class PostgresAIRequestRepository implements IAIRequestRepository {
    save(request: AIRequest): Promise<void>;
    findById(id: string): Promise<AIRequest | null>;
}
