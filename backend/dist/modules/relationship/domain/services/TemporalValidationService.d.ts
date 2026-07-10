import { Relationship } from '../entities/Relationship';
/**
 * Service responsible for validating temporal constraints of a relationship.
 */
export declare class TemporalValidationService {
    validate(relationship: Relationship): Promise<void>;
}
