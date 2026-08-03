import { KnowledgeGap } from '../entities/KnowledgeGap';

export interface IKnowledgeGapService {
  recordGap(topic: string, prompt: string): Promise<KnowledgeGap>;
}
