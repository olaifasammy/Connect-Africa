import { KnowledgeGap } from '../../domain/entities/KnowledgeGap';
export declare class KnowledgeGapEngine {
    recordTopic(topic: string): Promise<void>;
    generateSuggestions(topic: string): Promise<{
        entities: string[];
        relationships: string[];
        ontology: string[];
        articles: string[];
    }>;
    addToEditorialQueue(gap: KnowledgeGap): Promise<void>;
}
