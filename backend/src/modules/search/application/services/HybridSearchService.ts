import {
  provide,
} from 'inversify-binding-decorators';

import {
  injectable,
  inject,
} from 'inversify';

import {
  ISemanticSearchProvider,
} from '@modules/search/domain/services/ISemanticSearchProvider';

import {
  ISearchRepository,
} from '@modules/search/domain/repositories/ISearchRepository';

import {
  SearchDocument,
} from '@modules/search/domain/models/SearchDocument';

@provide(HybridSearchService, true)
@injectable()
export class HybridSearchService {
  constructor(
    @inject('ISemanticSearchProvider')
    private readonly semanticProvider:
      ISemanticSearchProvider,

    @inject('ISearchRepository')
    private readonly searchRepository:
      ISearchRepository,
  ) {}

  async search(
    query: string,
    limit: number = 10,
  ): Promise<SearchDocument[]> {
    const embedding =
      await this.semanticProvider.embed(
        query,
      );

    const semanticIds =
      await this.semanticProvider.search(
        embedding,
        limit * 2,
      );

    const fullTextResults =
      await this.searchRepository.search(
        query,
        undefined,
        'relevance',
        'desc',
        limit * 2,
      );

    /*
     * Full-text results are already scored by
     * the search provider. Semantic IDs are
     * currently used as a candidate signal.
     *
     * RRF/weighted fusion can be introduced
     * once the semantic provider exposes stable
     * document scores.
     */
    const semanticIdSet =
      new Set(
        semanticIds.map(
          (id) => id.toString(),
        ),
      );

    const combinedResults =
      new Map<
        string,
        SearchDocument
      >();

    for (
      const item
      of fullTextResults.documents
    ) {
      const document =
        item.document;

      combinedResults.set(
        document.id.toString(),
        document,
      );
    }

    /*
     * Preserve deterministic full-text ranking
     * while allowing semantic candidates to be
     * promoted when they are already present in
     * the full-text result set.
     */
    const documents =
      Array.from(
        combinedResults.values(),
      );

    documents.sort(
      (left, right) => {
        const leftSemantic =
          semanticIdSet.has(
            left.resourceId.toString(),
          );

        const rightSemantic =
          semanticIdSet.has(
            right.resourceId.toString(),
          );

        if (
          leftSemantic !== rightSemantic
        ) {
          return leftSemantic ? -1 : 1;
        }

        return 0;
      },
    );

    return documents.slice(
      0,
      limit,
    );
  }
}