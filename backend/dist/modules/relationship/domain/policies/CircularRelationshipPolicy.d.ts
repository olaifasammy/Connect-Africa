import { Relationship } from '../entities/Relationship';
import { IRelationshipPolicy } from './IRelationshipPolicy';
/**
 * Policy to detect circular relationships.
 */
export declare class CircularRelationshipPolicy implements IRelationshipPolicy {
    validate(relationship: Relationship): Promise<void>;
}
