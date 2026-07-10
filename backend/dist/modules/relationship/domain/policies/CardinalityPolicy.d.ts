import { Relationship } from '../entities/Relationship';
import { IRelationshipPolicy } from './IRelationshipPolicy';
/**
 * Policy to validate relationship cardinality.
 */
export declare class CardinalityPolicy implements IRelationshipPolicy {
    validate(relationship: Relationship): Promise<void>;
}
