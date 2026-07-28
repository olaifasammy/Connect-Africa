import { injectable, inject } from 'inversify';
import { IOntologyGraphService } from '@modules/ontology/public';
import { ISearchRepository } from '@modules/search/domain/repositories/ISearchRepository';
import { ISearchResult } from '@modules/search/domain/repositories/ISearchRepository';

@injectable()
export class OntologyAwareSearchService {
  constructor(
    @inject('IOntologyGraphService') private readonly ontologyGraphService: IOntologyGraphService,
    @inject('ISearchRepository') private readonly searchRepository: ISearchRepository
  ) {}

  async search(
    query: string,
    filters?: Record<string, any>,
    entityTypeId?: string
  ): Promise<ISearchResult> {
    // Validate entity type if provided
    if (entityTypeId) {
      const isValid = await this.ontologyGraphService.validateEntityType(entityTypeId);
      if (!isValid) {
        throw new Error(`Invalid entity type: ${entityTypeId}`);
      }
      filters = { ...filters, resourceType: entityTypeId };
    }

    // Perform search
    return await this.searchRepository.search(query, filters);
  }
}
