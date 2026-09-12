import {
  inject,
  injectable,
} from 'inversify';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  SearchQuery,
} from '../queries/SearchQuery';

import {
  ISearchRepository,
  SearchFilters,
} from '../../domain/repositories/ISearchRepository';

import {
  SearchResponseDto,
} from '../../interfaces/dto/SearchDTOs';

@provide(
  SearchQueryHandler,
  true,
)
@injectable()
export class SearchQueryHandler {
  constructor(
    @inject('ISearchRepository')
    private readonly searchRepository:
      ISearchRepository,
  ) {}

  async handle(
    query: SearchQuery,
  ): Promise<SearchResponseDto> {
    const request =
      query.request;

    const page =
      request.page ?? 1;

    const limit =
      request.limit ?? 10;

    const filters =
      request.filters
        ? {
            ...request.filters,

            tags:
              request.filters.tags,

            dateRange:
              request.filters.dateFrom ||
              request.filters.dateTo
                ? {
                    start:
                      request.filters.dateFrom,
                    end:
                      request.filters.dateTo,
                  }
                : undefined,
          }
        : undefined;

    let cursor:
      string | undefined;

    let searchResult = {
      documents: [],
      total: 0,
      facets:
        undefined,
      nextCursor:
        undefined,
    } as Awaited<
      ReturnType<
        ISearchRepository['search']
      >
    >;

    /*
     * The repository boundary is cursor-based.
     * Walk forward until the requested page is reached.
     */
    for (
      let currentPage = 1;
      currentPage <= page;
      currentPage += 1
    ) {
      searchResult =
        await this.searchRepository.search(
          request.query,
          filters as
            SearchFilters | undefined,
          request.sortBy,
          request.sortOrder,
          limit,
          cursor,
          request.includeFacets,
        );

      if (
        currentPage < page
      ) {
        if (
          !searchResult.nextCursor
        ) {
          break;
        }

        cursor =
          searchResult.nextCursor;
      }
    }

    const results =
      searchResult.documents.map(
        (item) => ({
          id:
            item.document.id.toString(),

          title:
            typeof item.document.content
              .title === 'string'
              ? item.document.content.title
              : 'Untitled',

          resourceType:
            item.document.resourceType,

          snippet:
            typeof item.document.content
              .snippet === 'string'
              ? item.document.content.snippet
              : '',

          score:
            item.score,
        }),
      );

    return {
      results,
      total:
        searchResult.total,
      page,
      limit,
      facets:
        searchResult.facets,
    };
  }
}