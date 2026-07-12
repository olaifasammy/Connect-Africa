import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { SearchQueryHandler } from '../../application/handlers/SearchQueryHandler';
import { SearchQuery } from '../../application/queries/SearchQuery';
import { SearchRequestDto } from '../dto/SearchDTOs';

@injectable()
export class SearchController {
  constructor(
    @inject(SearchQueryHandler) private readonly searchQueryHandler: SearchQueryHandler
  ) {}

  async search(req: Request, res: Response): Promise<void> {
    const requestDto: SearchRequestDto = {
      query: req.query.q as string,
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
}
