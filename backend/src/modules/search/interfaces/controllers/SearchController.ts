import {
  Request,
  Response,
} from 'express';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  injectable,
  inject,
} from 'inversify';

import {
  SearchQueryHandler,
} from '../../application/handlers/SearchQueryHandler';

import {
  IndexDocumentHandler,
  IndexDocumentCommand,
} from '../../application/handlers/IndexDocumentHandler';

import {
  UpdateIndexHandler,
  UpdateIndexCommand,
} from '../../application/handlers/UpdateIndexHandler';

import {
  DeleteIndexHandler,
  DeleteIndexCommand,
} from '../../application/handlers/DeleteIndexHandler';

import {
  BulkIndexHandler,
  BulkIndexCommand,
} from '../../application/handlers/BulkIndexHandler';

import {
  RebuildIndexHandler,
  RebuildIndexCommand,
} from '../../application/handlers/RebuildIndexHandler';

import {
  GraphSearchHandler,
} from '../../application/handlers/GraphSearchHandler';

import {
  SearchSuggestionsQueryHandler,
  SearchSuggestionsQuery,
} from '../../application/handlers/SearchSuggestionsQueryHandler';

import {
  SearchQuery,
} from '../../application/queries/SearchQuery';

import {
  SearchDocument,
  SearchResourceType,
  SearchContent,
} from '../../domain/models/SearchDocument';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  SearchQuerySchema,
  IndexDocumentSchema,
  BulkIndexSchema,
  RebuildIndexSchema,
  DeleteIndexSchema,
  SuggestionRequestSchema,
} from '../validation/SearchValidation';

@provide(
  SearchController,
  true,
)
@injectable()
export class SearchController {
  constructor(
    @inject(SearchQueryHandler)
    private readonly searchQueryHandler:
      SearchQueryHandler,

    @inject(IndexDocumentHandler)
    private readonly indexDocumentHandler:
      IndexDocumentHandler,

    @inject(UpdateIndexHandler)
    private readonly updateIndexHandler:
      UpdateIndexHandler,

    @inject(DeleteIndexHandler)
    private readonly deleteIndexHandler:
      DeleteIndexHandler,

    @inject(BulkIndexHandler)
    private readonly bulkIndexHandler:
      BulkIndexHandler,

    @inject(RebuildIndexHandler)
    private readonly rebuildIndexHandler:
      RebuildIndexHandler,

    @inject(GraphSearchHandler)
    private readonly graphSearchHandler:
      GraphSearchHandler,

    @inject(
      SearchSuggestionsQueryHandler,
    )
    private readonly suggestionsHandler:
      SearchSuggestionsQueryHandler,
  ) {}

  async search(
    req: Request,
    res: Response,
  ): Promise<void> {
    const parsed =
      SearchQuerySchema.parse(
        req.query,
      );

    const filters =
      parsed.resourceType ||
      parsed.ontology ||
      parsed.relationshipType ||
      parsed.category ||
      parsed.tags ||
      parsed.author ||
      parsed.language ||
      parsed.status ||
      parsed.dateFrom ||
      parsed.dateTo
        ? {
            resourceType:
              parsed.resourceType,

            ontology:
              parsed.ontology,

            relationshipType:
              parsed.relationshipType,

            category:
              parsed.category,

            tags:
              parsed.tags
                ? parsed.tags
                    .split(',')
                    .map(
                      (tag) =>
                        tag.trim(),
                    )
                    .filter(Boolean)
                : undefined,

            author:
              parsed.author,

            language:
              parsed.language,

            status:
              parsed.status,

            dateRange:
              parsed.dateFrom ||
              parsed.dateTo
                ? {
                    start:
                      parsed.dateFrom,
                    end:
                      parsed.dateTo,
                  }
                : undefined,
          }
        : undefined;

    const query =
      new SearchQuery({
        query:
          parsed.q,

        page:
          parsed.page !== undefined
            ? Number(parsed.page)
            : undefined,

        limit:
          parsed.limit !== undefined
            ? Number(parsed.limit)
            : undefined,

        filters,

        sortBy:
          parsed.sortBy,

        sortOrder:
          parsed.sortOrder,

        includeFacets:
          [],
      });

    const result =
      await this.searchQueryHandler.handle(
        query,
      );

    res.status(200).json(
      result,
    );
  }

  async indexDocument(
    req: Request,
    res: Response,
  ): Promise<void> {
    const parsed =
      IndexDocumentSchema.parse(
        req.body,
      );

    const document =
      new SearchDocument({
        id:
          new UniqueEntityId(
            parsed.id,
          ),

        resourceType:
          parsed.resourceType as
            SearchResourceType,

        resourceId:
          new UniqueEntityId(
            parsed.resourceId,
          ),

        content:
          parsed.content as unknown as
            SearchContent,

        createdAt:
          new Date(),
      });

    const result =
      await this.indexDocumentHandler.handle(
        new IndexDocumentCommand(
          document,
        ),
      );

    res.status(200).json(
      result,
    );
  }

  async updateIndex(
    req: Request,
    res: Response,
  ): Promise<void> {
    const parsed =
      IndexDocumentSchema.parse(
        req.body,
      );

    const document =
      new SearchDocument({
        id:
          new UniqueEntityId(
            parsed.id,
          ),

        resourceType:
          parsed.resourceType as
            SearchResourceType,

        resourceId:
          new UniqueEntityId(
            parsed.resourceId,
          ),

        content:
          parsed.content as unknown as
            SearchContent,

        createdAt:
          new Date(),
      });

    const result =
      await this.updateIndexHandler.handle(
        new UpdateIndexCommand(
          document,
        ),
      );

    res.status(200).json(
      result,
    );
  }

  async deleteIndex(
    req: Request,
    res: Response,
  ): Promise<void> {
    const parsed =
      DeleteIndexSchema.parse(
        req.params,
      );

    const id =
      new UniqueEntityId(
        parsed.id,
      );

    const result =
      await this.deleteIndexHandler.handle(
        new DeleteIndexCommand(
          id,
        ),
      );

    res.status(200).json(
      result,
    );
  }

  async bulkIndex(
    req: Request,
    res: Response,
  ): Promise<void> {
    const parsed =
      BulkIndexSchema.parse(
        req.body,
      );

    const documents =
      parsed.map(
        (item) =>
          new SearchDocument({
            id:
              new UniqueEntityId(
                item.id,
              ),

            resourceType:
              item.resourceType as
                SearchResourceType,

            resourceId:
              new UniqueEntityId(
                item.resourceId,
              ),

            content:
              item.content as unknown as
                SearchContent,

            createdAt:
              new Date(),
          }),
      );

    const result =
      await this.bulkIndexHandler.handle(
        new BulkIndexCommand(
          documents,
        ),
      );

    res.status(200).json(
      result,
    );
  }

  async rebuildIndex(
    req: Request,
    res: Response,
  ): Promise<void> {
    const parsed =
      RebuildIndexSchema.parse(
        req.params,
      );

    const result =
      await this.rebuildIndexHandler.handle(
        new RebuildIndexCommand(
          parsed.name,
        ),
      );

    res.status(200).json(
      result,
    );
  }

  async graphSearch(
    req: Request,
    res: Response,
  ): Promise<void> {
    const result =
      await this.graphSearchHandler.handle(
        req.body,
      );

    res.status(200).json(
      result,
    );
  }

  async getSuggestions(
    req: Request,
    res: Response,
  ): Promise<void> {
    const parsed =
      SuggestionRequestSchema.parse(
        req.query,
      );

    const result =
      await this.suggestionsHandler.handle(
        new SearchSuggestionsQuery(
          parsed.q,
        ),
      );

    res.status(200).json(
      result,
    );
  }
}