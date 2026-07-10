import { Relationship } from '../entities/Relationship';
import { IRelationshipPolicy } from '../policies/IRelationshipPolicy';
/**
 * Service responsible for orchestrating relationship validation against defined domain policies.
 */
export declare class RelationshipValidationService {
    private readonly policies;
    constructor(policies: IRelationshipPolicy[]);
    validate(relationship: Relationship): Promise<void>;
}
