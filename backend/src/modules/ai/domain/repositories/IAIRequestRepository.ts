import { AIRequest } from '../entities/AIRequest'; // Need to create this entity if not already

export interface IAIRequestRepository {
  save(request: AIRequest): Promise<void>;
  findById(id: string): Promise<AIRequest | null>;
}
