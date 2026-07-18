import { AIRequest } from '../entities/AIRequest';
export interface IAIRequestRepository {
    save(request: AIRequest): Promise<void>;
    findById(id: string): Promise<AIRequest | null>;
}
