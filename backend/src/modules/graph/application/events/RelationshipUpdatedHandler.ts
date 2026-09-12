import {
  inject,
  injectable,
} from 'inversify';
import { provide } from 'inversify-binding-decorators';

import {
  RelationshipUpdatedEvent,
} from '@modules/relationship/public';

import {
  IGraphRepository,
} from '../../domain/repositories/IGraphRepository';

import {
  GraphEdge,
} from '../../domain/entities/GraphEntities';

import {
  OntologyValidator,
} from '../../domain/services/OntologyValidator';

import {
  GraphConflictError,
} from '../../domain/errors/GraphErrors';

@provide(RelationshipUpdatedHandler, true)
@injectable()
export class RelationshipUpdatedHandler {
  constructor(
    @inject('IGraphRepository')
    private readonly repository:
      IGraphRepository,

    @inject(OntologyValidator)
    private readonly ontologyValidator:
      OntologyValidator,
  ) {}

  async handle(
    event: RelationshipUpdatedEvent,
  ): Promise<void> {
    const sourceEntityId =
      event.sourceEntityId?.trim();

    const targetEntityId =
      event.targetEntityId?.trim();

    const previousRelationshipTypeId =
      event.previousRelationshipTypeId?.trim();

    const relationshipTypeId =
      event.relationshipTypeId?.trim();

    if (!sourceEntityId) {
      throw new Error(
        'Relationship update event source entity ID is required.',
      );
    }

    if (!targetEntityId) {
      throw new Error(
        'Relationship update event target entity ID is required.',
      );
    }

    if (!previousRelationshipTypeId) {
      throw new Error(
        'Relationship update event previous relationship type ID is required.',
      );
    }

    if (!relationshipTypeId) {
      throw new Error(
        'Relationship update event relationship type ID is required.',
      );
    }

    if (
      sourceEntityId ===
      targetEntityId
    ) {
      throw new Error(
        'A graph relationship cannot connect an entity to itself.',
      );
    }

    /*
     * If the event describes no actual type change, the graph
     * already represents the desired relationship coordinates.
     */
    if (
      previousRelationshipTypeId ===
      relationshipTypeId
    ) {
      return;
    }

    const sourceNode =
      await this.repository.findById(
        sourceEntityId,
      );

    const targetNode =
      await this.repository.findById(
        targetEntityId,
      );

    if (!sourceNode) {
      throw new Error(
        `Source entity not found: ${sourceEntityId}`,
      );
    }

    if (!targetNode) {
      throw new Error(
        `Target entity not found: ${targetEntityId}`,
      );
    }

    /*
     * The relationship bounded context has already validated
     * the semantic update. Graph independently validates the
     * projection against the current ontology before materializing
     * the new edge.
     */
    await this.ontologyValidator.validateEdge(
      relationshipTypeId,
      sourceNode.type,
      targetNode.type,
    );

    await this.ontologyValidator.validateCardinality(
      relationshipTypeId,
      sourceNode.type,
    );

    /*
     * First remove the old graph representation.
     *
     * A missing old edge is acceptable because event delivery
     * may be retried after a partial projection.
     */
    try {
      await this.repository.deleteEdge(
        sourceEntityId,
        targetEntityId,
        previousRelationshipTypeId,
      );
    } catch (error: any) {
      if (
        error?.code !==
        'GRAPH_NOT_FOUND_ERROR'
      ) {
        throw error;
      }
    }

    /*
     * If the new representation already exists, the projection
     * has converged. This makes retries safe.
     */
    const edgeExists =
      await this.repository.existsEdge(
        sourceEntityId,
        targetEntityId,
        relationshipTypeId,
      );

    if (edgeExists) {
      return;
    }

    const edge =
      new GraphEdge(
        sourceEntityId,
        targetEntityId,
        relationshipTypeId,
        {},
      );

    try {
      await this.repository.saveEdge(
        edge,
      );
    } catch (error) {
      /*
       * Another delivery/worker may have materialized the
       * desired edge concurrently.
       */
      if (
        error instanceof GraphConflictError
      ) {
        return;
      }

      throw error;
    }
  }
}