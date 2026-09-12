import {
  inject,
  injectable,
} from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IOntologyGraphService } from '@modules/ontology/public';

import { GraphValidationError } from '../errors/GraphErrors';

@provide(OntologyValidator, true)
@injectable()
export class OntologyValidator {
  constructor(
    @inject('IOntologyGraphService')
    private readonly ontologyGraphService:
      IOntologyGraphService,
  ) {}

  async validateNode(
    entityTypeId: string,
  ): Promise<void> {
    const normalizedTypeId =
      entityTypeId?.trim();

    if (!normalizedTypeId) {
      throw new GraphValidationError(
        'Entity type ID is required.',
      );
    }

    const isValid =
      await this.ontologyGraphService.validateEntityType(
        normalizedTypeId,
      );

    if (!isValid) {
      throw new GraphValidationError(
        `Invalid entity type: ${normalizedTypeId}`,
      );
    }
  }

  async validateEdge(
    relationshipTypeId: string,
    sourceEntityTypeId: string,
    targetEntityTypeId: string,
  ): Promise<void> {
    const normalizedRelationshipTypeId =
      relationshipTypeId?.trim();

    const normalizedSourceTypeId =
      sourceEntityTypeId?.trim();

    const normalizedTargetTypeId =
      targetEntityTypeId?.trim();

    if (!normalizedRelationshipTypeId) {
      throw new GraphValidationError(
        'Relationship type ID is required.',
      );
    }

    if (!normalizedSourceTypeId) {
      throw new GraphValidationError(
        'Source entity type ID is required.',
      );
    }

    if (!normalizedTargetTypeId) {
      throw new GraphValidationError(
        'Target entity type ID is required.',
      );
    }

    const isValid =
      await this.ontologyGraphService.validateRelationshipType(
        normalizedRelationshipTypeId,
        normalizedSourceTypeId,
        normalizedTargetTypeId,
      );

    if (!isValid) {
      throw new GraphValidationError(
        `Invalid relationship type or incompatible entity types: ${normalizedRelationshipTypeId}`,
      );
    }
  }

  async validateCardinality(
    relationshipTypeId: string,
    sourceEntityTypeId: string,
  ): Promise<void> {
    const normalizedRelationshipTypeId =
      relationshipTypeId?.trim();

    const normalizedSourceTypeId =
      sourceEntityTypeId?.trim();

    if (!normalizedRelationshipTypeId) {
      throw new GraphValidationError(
        'Relationship type ID is required.',
      );
    }

    if (!normalizedSourceTypeId) {
      throw new GraphValidationError(
        'Source entity type ID is required.',
      );
    }

    const isAllowed =
      await this.ontologyGraphService.validateCardinality(
        normalizedRelationshipTypeId,
        normalizedSourceTypeId,
      );

    if (!isAllowed) {
      throw new GraphValidationError(
        `Cardinality violation for relationship type: ${normalizedRelationshipTypeId}`,
      );
    }
  }

  async validateMetadata(
    entityTypeId: string,
    metadata: Record<string, unknown>,
  ): Promise<void> {
    const normalizedTypeId =
      entityTypeId?.trim();

    if (!normalizedTypeId) {
      throw new GraphValidationError(
        'Entity type ID is required.',
      );
    }

    if (
      metadata === null ||
      typeof metadata !== 'object' ||
      Array.isArray(metadata)
    ) {
      throw new GraphValidationError(
        'Graph node metadata must be an object.',
      );
    }

    const isSchemaValid =
      await this.ontologyGraphService.validateMetadataSchema(
        normalizedTypeId,
        metadata,
      );

    if (!isSchemaValid) {
      throw new GraphValidationError(
        `Metadata schema violation for type: ${normalizedTypeId}`,
      );
    }
  }
}