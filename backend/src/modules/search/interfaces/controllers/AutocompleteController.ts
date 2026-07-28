import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { AutocompleteQueryHandler } from '../../application/handlers/AutocompleteQueryHandler';
import { AutocompleteQuery } from '../../application/queries/AutocompleteQuery';

@injectable()
export class AutocompleteController {
  constructor(
    @inject(AutocompleteQueryHandler) private readonly autocompleteQueryHandler: AutocompleteQueryHandler
  ) {}

  async autocomplete(req: Request, res: Response): Promise<void> {
    const query = req.query.q as string;

    if (!query) {
      res.status(400).json({ success: false, errors: [{ code: 'INVALID_QUERY', message: 'Query parameter is required' }] });
      return;
    }

    const autocompleteQuery = new AutocompleteQuery(query);
    const result = await this.autocompleteQueryHandler.handle(autocompleteQuery);
    res.json({ success: true, data: result });
  }
}
