import { Request, Response } from 'express';
import { BaseController } from '@shared/interfaces/http/controllers/BaseController';
import { CreateOntologyCommandHandler } from '@modules/ontology/application/handlers/CreateOntologyCommandHandler';
import { CreateOntologySchema } from '@modules/ontology/application/dto/OntologyValidationDto';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/domain/policies/rbac/Permissions';

export class OntologyController extends BaseController {
  constructor(private readonly createOntologyCommandHandler: CreateOntologyCommandHandler) {
    super();
  }

  // Middleware would be applied in routes, but adding it here for reference in the controller if needed by architecture
  async create(req: Request, res: Response): Promise<void> {
    try {
      // Authorization logic to be applied at route level
      const validatedData = CreateOntologySchema.parse(req.body);
      const result = await this.createOntologyCommandHandler.handle(validatedData);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  protected async execute(req: Request, res: Response): Promise<void> {
    // Explicit handlers preferred; maintain for backward compatibility if needed by BaseController
  }
}
