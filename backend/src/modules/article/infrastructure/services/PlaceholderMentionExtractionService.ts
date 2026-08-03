import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface IMentionExtractionService {
  extractMentions(content: string): Promise<UniqueEntityId[]>;
}

export class PlaceholderMentionExtractionService implements IMentionExtractionService {
  // TODO: Replace with real AI implementation when available
  async extractMentions(content: string): Promise<UniqueEntityId[]> {
    console.warn('PlaceholderMentionExtractionService: Using placeholder. Replace with real AI implementation.');
    return [];
  }
}
