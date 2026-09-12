import {
  inject,
  injectable,
} from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { RelationshipCreatedEvent } from '@modules/relationship/public';

import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphEdge } from '../../domain/entities/GraphEntities';
import { OntologyValidator } from '../../domain/services/OntologyValidator';
import { GraphConflictError } from '../../domain/errors/GraphErrors';

@provide(RelationshipCreatedHandler, true)
@injectable()
export class RelationshipCreatedHandler {
  constructor(
    @inject('IGraphRepository')
    private readonly repository:
      IGraphRepository,

    @inject(OntologyValidator)
    private readonly ontologyValidator:
      OntologyValidator,
  ) {}

  async handle(
    event: RelationshipCreatedEvent,
  ): Promise<void> {
    const sourceEntityId =
      event.sourceEntityId?.trim();

    const targetEntityId =
      event.targetEntityId?.trim();

    const relationshipTypeId =
      event.relationshipTypeId?.trim();

    if (!sourceEntityId) {
      throw new Error(
        'Relationship event source entity ID is required.',
      );
    }

    if (!targetEntityId) {
      throw new Error(
        'Relationship event target entity ID is required.',
      );
    }

    if (!relationshipTypeId) {
      throw new Error(
        'Relationship event relationship type ID is required.',
      );
    }

    if (
      sourceEntityId === targetEntityId
    ) {
      throw new Error(
        'A graph relationship cannot connect an entity to itself.',
      );
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
     * IMPORTANT:
     *
     * validateEdge() expects Entity Type IDs, not Entity IDs.
     *
     * sourceNode.type and targetNode.type are the authoritative
     * Entity Type IDs carried by the Entity projection.
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

    const edgeExists =
      await this.repository.existsEdge(
        sourceEntityId,
        targetEntityId,
        relationshipTypeId,
      );

    if (edgeExists) {
      /*
       * Domain event delivery must be idempotent.
       *
       * A duplicate RelationshipCreatedEvent means the desired
       * graph edge already exists. Do not create another edge.
       */
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
       * A concurrent duplicate may have won the race between
       * existsEdge() and saveEdge().
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
