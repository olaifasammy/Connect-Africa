import { Relationship } from '../entities/Relationship';
import { IRelationshipPolicy } from '../policies/IRelationshipPolicy';

/**
 * Service responsible for orchestrating relationship validation against defined domain policies.
 */
export class RelationshipValidationService {
  constructor(private readonly policies: IRelationshipPolicy[]) {}

  async validate(relationship: Relationship): Promise<void> {
    for (const policy of this.policies) {
      await policy.validate(relationship);
    }
  }
}
