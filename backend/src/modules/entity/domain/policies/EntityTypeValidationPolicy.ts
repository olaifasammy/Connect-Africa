import { Entity } from '../entities/Entity';
import { IEntityPolicy } from './IEntityPolicy';
import { IOntologyGraphService } from '@modules/ontology/application/services/IOntologyGraphService';

/**
 * Policy to validate entity types.
 */
export class EntityTypeValidationPolicy implements IEntityPolicy {
  constructor(private readonly ontologyGraphService: IOntologyGraphService) {}

  async validate(entity: Entity): Promise<void> {
    const isValid = await this.ontologyGraphService.validateEntityType(entity.type);
    if (!isValid) {
      throw new Error(`Invalid entity type: ${entity.type}`);
    }
  }
}
