import {
  inject,
  injectable,
} from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { SearchGraphQuery } from '../queries/SearchGraphQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphValidationError } from '../../domain/errors/GraphErrors';

@provide(SearchGraphHandler, true)
@injectable()
export class SearchGraphHandler {
  constructor(
    @inject('IGraphRepository')
    private readonly repository:
      IGraphRepository,
  ) {}

  async handle(
    query: SearchGraphQuery,
  ) {
    const limit =
      query.limit;

    const offset =
      query.offset;

    if (
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      throw new GraphValidationError(
        'Graph search limit must be an integer between 1 and 100.',
      );
    }

    if (
      !Number.isInteger(offset) ||
      offset < 0
    ) {
      throw new GraphValidationError(
        'Graph search offset must be an integer greater than or equal to 0.',
      );
    }

    if (query.label !== undefined) {
      const label =
        query.label.trim();

      if (!label) {
        throw new GraphValidationError(
          'Graph search label cannot be empty.',
        );
      }

      return this.repository.findByLabel(
        label,
        limit,
        offset,
      );
    }

    return [];
  }
}