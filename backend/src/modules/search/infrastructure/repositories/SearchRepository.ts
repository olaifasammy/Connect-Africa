import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { SearchDocument } from '../../domain/models/SearchDocument';
import { ISearchRepository } from '../../domain/repositories/ISearchRepository';
import { SearchProvider } from '../search/SearchProvider';

export class SearchRepository implements ISearchRepository {
  constructor(private readonly searchProvider: SearchProvider) {}

  async findById(id: UniqueEntityId): Promise<SearchDocument | null> {
    return await this.searchProvider.findById(id.toString());
  }

  async save(document: SearchDocument): Promise<void> {
    // Determine if it should be index or update.
    // For now, let's treat it as an upsert call.
    // If we have a findById, we can check.
    const existing = await this.findById(document.id);
    if (existing) {
      await this.searchProvider.update(document);
    } else {
      await this.searchProvider.index(document);
    }
  }

  async delete(id: UniqueEntityId): Promise<void> {
    await this.searchProvider.delete(id.toString());
  }

  async autocomplete(query: string): Promise<string[]> {
    return await this.searchProvider.autocomplete(query);
  }

  async search(
    query: string, 
    filters?: Record<string, any>, 
    sortBy?: 'relevance' | 'alphabetical' | 'dateCreated' | 'dateUpdated' | 'popularity',
    sortOrder?: 'asc' | 'desc',
    limit?: number,
    offset?: number
  ): Promise<SearchDocument[]> {
    return await this.searchProvider.search(query, filters, sortBy, sortOrder, limit, offset);
  }

  async bulkSave(documents: SearchDocument[]): Promise<void> {
    await this.searchProvider.bulkIndex(documents);
  }
}
