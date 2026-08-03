import { Entity } from '../entities/Entity';
import { IEntityPolicy } from './IEntityPolicy';

/**
 * Policy to validate entity types.
 */
export class EntityTypeValidationPolicy implements IEntityPolicy {
  async validate(entity: Entity): Promise<void> {
    // Logic to validate type exists in Ontology
    return Promise.resolve();
  }
}
