import { PropertyDefinition } from '../value-objects/PropertyDefinition';
import { DomainError } from '../errors/DomainError';

export class PropertyCompatibilityPolicy {
  public validate(source: PropertyDefinition, target: PropertyDefinition): void {
    if (source.dataType !== target.dataType) {
      throw new DomainError('Property data types are incompatible.');
    }
  }
}
