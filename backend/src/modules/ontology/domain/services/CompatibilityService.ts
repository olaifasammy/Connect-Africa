import { PropertyDefinition } from '../value-objects/PropertyDefinition';
import { PropertyCompatibilityPolicy } from '../policies/PropertyCompatibilityPolicy';
import { DomainError } from '../errors/DomainError';

export class CompatibilityService {
  constructor(private readonly propertyPolicy: PropertyCompatibilityPolicy) {}

  public checkPropertyCompatibility(source: PropertyDefinition, target: PropertyDefinition): void {
    try {
      this.propertyPolicy.validate(source, target);
    } catch (error) {
      if (error instanceof DomainError) {
        throw error;
      }
      throw new DomainError('Incompatibility detected during validation.');
    }
  }
}
