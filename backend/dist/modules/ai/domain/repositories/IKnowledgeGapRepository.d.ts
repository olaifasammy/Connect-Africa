import { KnowledgeGap } from '../entities/KnowledgeGap';
export interface IKnowledgeGapRepository {
    save(gap: KnowledgeGap): Promise<void>;
    findById(id: string): Promise<KnowledgeGap | null>;
    findAllOpen(): Promise<KnowledgeGap[]>;
}
