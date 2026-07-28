import { Router } from 'express';
import { RelationshipController } from '../controllers/RelationshipController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { CreateRelationshipSchema } from '../../application/validators/RelationshipValidators';
import { Permission } from '@modules/auth/public';

export const relationshipRoutes = (controller: RelationshipController, authMiddleware: AuthenticationMiddleware): Router => {
  const router = Router();

  // Apply security and validation middleware
  router.post(
    '/',
    authMiddleware.authenticate,
    authorize(Permission.RELATIONSHIP_WRITE),
    validate(CreateRelationshipSchema),
    controller.create.bind(controller)
  );

  return router;
};
