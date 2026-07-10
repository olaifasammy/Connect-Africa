import { Request, Response } from 'express';
import { RelationshipService } from '../../application/services/RelationshipService';
import { CreateRelationshipCommand } from '../../application/commands/RelationshipCommands';
import { CreateRelationshipSchema } from '../../application/validators/RelationshipValidators';

/**
 * Controller for relationship operations, including security and validation enforcement.
 */
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}

  /**
   * Handles creation of a new relationship.
   * Requires: Authentication, Valid DTO, Authorization.
   */
  async create(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    // 1. Validation (delegated to middleware, but schema available for reference)
    const validatedData = CreateRelationshipSchema.parse(req.body);

    // 2. Command mapping
    const command = new CreateRelationshipCommand(
      validatedData.sourceEntityId,
      validatedData.targetEntityId,
      validatedData.relationshipTypeId,
      userId
    );
    
    // 3. Service orchestration
    await this.relationshipService.createRelationship(command);
    
    // 4. Response
    res.status(201).json({ success: true, data: { message: 'Relationship created' } });
  }
}
