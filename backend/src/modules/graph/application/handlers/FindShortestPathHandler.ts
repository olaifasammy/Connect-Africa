import {
  inject,
  injectable,
} from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { FindShortestPathQuery } from '../queries/FindShortestPathQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphValidationError } from '../../domain/errors/GraphErrors';

@provide(FindShortestPathHandler, true)
@injectable()
export class FindShortestPathHandler {
  constructor(
    @inject('IGraphRepository')
    private readonly repository:
      IGraphRepository,
  ) {}

  async handle(
    query: FindShortestPathQuery,
  ) {
    const start =
      query.startEntityId?.trim();

    const end =
      query.endEntityId?.trim();

    if (!start) {
      throw new GraphValidationError(
        'Start entity ID is required.',
      );
    }

    if (!end) {
      throw new GraphValidationError(
        'End entity ID is required.',
      );
    }

    return this.repository.findShortestPath(
      start,
      end,
    );
  }
}