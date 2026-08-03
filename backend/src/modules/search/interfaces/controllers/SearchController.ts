import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { SearchQueryHandler } from '../../application/handlers/SearchQueryHandler';
import { IndexDocumentHandler, IndexDocumentCommand } from '../../application/handlers/IndexDocumentHandler';
import { UpdateIndexHandler, UpdateIndexCommand } from '../../application/handlers/UpdateIndexHandler';
import { DeleteIndexHandler, DeleteIndexCommand } from '../../application/handlers/DeleteIndexHandler';
import { BulkIndexHandler, BulkIndexCommand } from '../../application/handlers/BulkIndexHandler';
import { RebuildIndexHandler, RebuildIndexCommand } from '../../application/handlers/RebuildIndexHandler';
import { GraphSearchHandler } from '../../application/handlers/GraphSearchHandler';
import { SearchSuggestionsQueryHandler } from '../../application/handlers/SearchSuggestionsQueryHandler';
import { SearchSuggestionsQuery } from '../../application/handlers/SearchSuggestionsQueryHandler';
import { SearchQuery } from '../../application/queries/SearchQuery';
import { SearchRequestDto } from '../dto/SearchDTOs';
import { SearchDocument } from '../../domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@injectable()
export class SearchController {
  constructor(
    @inject(SearchQueryHandler) private readonly searchQueryHandler: SearchQueryHandler,
    @inject(IndexDocumentHandler) private readonly indexDocumentHandler: IndexDocumentHandler,
    @inject(UpdateIndexHandler) private readonly updateIndexHandler: UpdateIndexHandler,
    @inject(DeleteIndexHandler) private readonly deleteIndexHandler: DeleteIndexHandler,
    @inject(BulkIndexHandler) private readonly bulkIndexHandler: BulkIndexHandler,
    @inject(RebuildIndexHandler) private readonly rebuildIndexHandler: RebuildIndexHandler,
    @inject(GraphSearchHandler) private readonly graphSearchHandler: GraphSearchHandler,
    @inject(SearchSuggestionsQueryHandler) private readonly suggestionsHandler: SearchSuggestionsQueryHandler
  ) {}

  async search(req: Request, res: Response): Promise<void> {
    const requestDto: SearchRequestDto = {
      query: typeof req.query.q === 'string' ? req.query.q : '',
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      filters: {
        resourceType: req.query.resourceType
      },
      sortBy: req.query.sortBy as any,
      sortOrder: req.query.sortOrder as any
    };

    if (!requestDto.query) {
      res.status(400).json({ success: false, errors: [{ code: 'INVALID_QUERY', message: 'Query parameter is required' }] });
      return;
    }

    const query = new SearchQuery(requestDto);
    const result = await this.searchQueryHandler.handle(query);
    res.json({ success: true, data: result });
  }

  async indexDocument(req: Request, res: Response): Promise<void> {
    const doc = new SearchDocument(
        new UniqueEntityId(req.body.id),
        req.body.resourceType,
        new UniqueEntityId(req.body.resourceId),
        req.body.content
    );
    await this.indexDocumentHandler.handle(new IndexDocumentCommand(doc));
    res.status(201).json({ success: true });
  }

  async updateIndex(req: Request, res: Response): Promise<void> {
    const doc = new SearchDocument(
        new UniqueEntityId(req.body.id),
        req.body.resourceType,
        new UniqueEntityId(req.body.resourceId),
        req.body.content
    );
    await this.updateIndexHandler.handle(new UpdateIndexCommand(doc));
    res.status(200).json({ success: true });
  }

  async deleteIndex(req: Request, res: Response): Promise<void> {
    await this.deleteIndexHandler.handle(new DeleteIndexCommand(new UniqueEntityId(req.params.id as string)));
    res.status(204).send();
  }

  async bulkIndex(req: Request, res: Response): Promise<void> {
    const docs = (req.body as any[]).map(d => new SearchDocument(
        new UniqueEntityId(d.id),
        d.resourceType,
        new UniqueEntityId(d.resourceId),
        d.content
    ));
    await this.bulkIndexHandler.handle(new BulkIndexCommand(docs));
    res.status(201).json({ success: true });
  }

  async graphSearch(req: Request, res: Response): Promise<void> {
    const result = await this.graphSearchHandler.handle(req.body);
    res.json({ success: true, data: result });
  }

  async getSuggestions(req: Request, res: Response): Promise<void> {
    const query = req.query.q as string;
    if (!query) {
      res.status(400).json({ success: false, message: 'Query parameter is required' });
      return;
    }
    const result = await this.suggestionsHandler.handle(new SearchSuggestionsQuery(query));
    res.json({ success: true, data: result });
  }

  async rebuildIndex(req: Request, res: Response): Promise<void> {
    const name = req.params.name as string;
    if (!name) {
      res.status(400).json({ success: false, message: 'Index name is required' });
      return;
    }
    await this.rebuildIndexHandler.handle(new RebuildIndexCommand(name));
    res.status(202).json({ success: true });
  }
}
