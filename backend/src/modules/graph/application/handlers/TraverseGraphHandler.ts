import {
  inject,
  injectable,
} from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { TraverseGraphQuery } from '../queries/TraverseGraphQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphValidationError } from '../../domain/errors/GraphErrors';

@provide(TraverseGraphHandler, true)
@injectable()
export class TraverseGraphHandler {
  constructor(
    @inject('IGraphRepository')
    private readonly repository:
      IGraphRepository,
  ) {}

  async handle(
    query: TraverseGraphQuery,
  ) {
    const entityId =
      query.entityId?.trim();

    if (!entityId) {
      throw new GraphValidationError(
        'Entity ID is required.',
      );
    }

    if (
      !Number.isInteger(
        query.maxDepth,
      ) ||
      query.maxDepth < 1 ||
      query.maxDepth > 10
    ) {
      throw new GraphValidationError(
        'Graph traversal depth must be an integer between 1 and 10.',
      );
    }

    if (
      query.mode !== 'depth' &&
      query.mode !== 'breadth'
    ) {
      throw new GraphValidationError(
        'Graph traversal mode must be depth or breadth.',
      );
    }

    if (query.mode === 'breadth') {
      return this.repository.breadthTraversal(
        entityId,
        query.maxDepth,
      );
    }

    return this.repository.depthTraversal(
      entityId,
      query.maxDepth,
    );
  }
}