import { Request, Response } from 'express';
import { RelationshipService } from '../../application/services/RelationshipService';
import { CreateRelationshipCommand } from '../../application/commands/RelationshipCommands';
import { CreateRelationshipSchema } from '../../application/validators/RelationshipValidators';
import { GetRelationshipByIdHandler } from '../../application/handlers/GetRelationshipByIdHandler';
import { GetRelationshipQuery } from '../../application/queries/RelationshipQueries';

/**
 * Controller for relationship operations, including security and validation enforcement.
 */
export class RelationshipController {
  constructor(
    private readonly relationshipService: RelationshipService,
    private readonly getByIdHandler: GetRelationshipByIdHandler
  ) {}

  /**
   * Handles creation of a new relationship.
   * Requires: Authentication, Valid DTO, Authorization.
   */
  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    // 1. Validation (delegated to middleware, but schema available for reference)
    const validatedData = CreateRelationshipSchema.parse(req.body);

    // 2. Command mapping
    const command = new CreateRelationshipCommand(
      validatedData.sourceEntityId,
      validatedData.sourceEntityTypeId,
      validatedData.targetEntityId,
      validatedData.targetEntityTypeId,
      validatedData.relationshipTypeId,
      userId!
    );
    
    // 3. Service orchestration
    await this.relationshipService.createRelationship(command);
    
    // 4. Response
    res.status(201).json({ success: true, data: { message: 'Relationship created' } });
  }

  async get(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const query = new GetRelationshipQuery(id);
    const result = await this.getByIdHandler.handle(query);
    
    if (!result) {
        res.status(404).json({ success: false, errors: [{ code: 'RELATIONSHIP_NOT_FOUND', message: 'Relationship not found' }] });
        return;
    }

    res.status(200).json({ success: true, data: result });
  }
}
