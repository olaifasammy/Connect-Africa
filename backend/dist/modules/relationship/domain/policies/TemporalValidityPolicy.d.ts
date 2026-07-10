import { Relationship } from '../entities/Relationship';
import { IRelationshipPolicy } from './IRelationshipPolicy';
/**
 * Policy to validate temporal validity.
 */
export declare class TemporalValidityPolicy implements IRelationshipPolicy {
    validate(relationship: Relationship): Promise<void>;
}
