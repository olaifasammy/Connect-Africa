import { Request, Response } from 'express';
import { AutocompleteQueryHandler } from '../../application/handlers/AutocompleteQueryHandler';
export declare class AutocompleteController {
    private readonly autocompleteQueryHandler;
    constructor(autocompleteQueryHandler: AutocompleteQueryHandler);
    autocomplete(req: Request, res: Response): Promise<void>;
}
