import {
  injectable,
  inject,
} from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { RelationshipDeletedEvent } from '@modules/relationship/public';

import { IGraphRepository } from '../../domain/repositories/IGraphRepository';

@provide(RelationshipDeletedHandler, true)
@injectable()
export class RelationshipDeletedHandler {
  constructor(
    @inject('IGraphRepository')
    private readonly repository:
      IGraphRepository,
  ) {}

  async handle(
    event: RelationshipDeletedEvent,
  ): Promise<void> {
    const sourceEntityId =
      event.sourceEntityId?.trim();

    const targetEntityId =
      event.targetEntityId?.trim();

    const relationshipTypeId =
      event.relationshipTypeId?.trim();

    /*
     * RelationshipDeletedEvent already carries the complete
     * graph coordinates. Graph must not depend on the
     * RelationshipService to reconstruct them after deletion.
     */
    if (
      !sourceEntityId ||
      !targetEntityId ||
      !relationshipTypeId
    ) {
      /*
       * An unenriched deletion event cannot safely identify the
       * graph edge. Do not guess which edge should be removed.
       */
      return;
    }

    try {
      await this.repository.deleteEdge(
        sourceEntityId,
        targetEntityId,
        relationshipTypeId,
      );
    } catch (error: any) {
      /*
       * Event delivery is idempotent. If the graph edge has
       * already been removed, synchronization is complete.
       */
      if (
        error?.code ===
        'GRAPH_NOT_FOUND_ERROR'
      ) {
        return;
      }

      throw error;
    }
  }
}