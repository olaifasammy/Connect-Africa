import { Request, Response } from 'express';
import { SearchQueryHandler } from '../../application/handlers/SearchQueryHandler';
export declare class SearchController {
    private readonly searchQueryHandler;
    constructor(searchQueryHandler: SearchQueryHandler);
    search(req: Request, res: Response): Promise<void>;
}
