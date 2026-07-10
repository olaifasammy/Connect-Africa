import { Request, Response } from 'express';
import { RelationshipService } from '../../application/services/RelationshipService';
/**
 * Controller for relationship operations, including security and validation enforcement.
 */
export declare class RelationshipController {
    private readonly relationshipService;
    constructor(relationshipService: RelationshipService);
    /**
     * Handles creation of a new relationship.
     * Requires: Authentication, Valid DTO, Authorization.
     */
    create(req: Request, res: Response): Promise<void>;
}
