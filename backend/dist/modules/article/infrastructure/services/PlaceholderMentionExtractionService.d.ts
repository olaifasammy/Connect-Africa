import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface IMentionExtractionService {
    extractMentions(content: string): Promise<UniqueEntityId[]>;
}
export declare class PlaceholderMentionExtractionService implements IMentionExtractionService {
    extractMentions(content: string): Promise<UniqueEntityId[]>;
}
