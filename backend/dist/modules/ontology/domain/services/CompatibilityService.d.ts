import { PropertyDefinition } from '../value-objects/PropertyDefinition';
import { PropertyCompatibilityPolicy } from '../policies/PropertyCompatibilityPolicy';
export declare class CompatibilityService {
    private readonly propertyPolicy;
    constructor(propertyPolicy: PropertyCompatibilityPolicy);
    checkPropertyCompatibility(source: PropertyDefinition, target: PropertyDefinition): void;
}
