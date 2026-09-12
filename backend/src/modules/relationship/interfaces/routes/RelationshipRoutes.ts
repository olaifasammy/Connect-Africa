import { Router } from 'express';
import { RelationshipController } from '../controllers/RelationshipController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/public';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { CreateRelationshipSchema, UpdateRelationshipSchema } from '../../application/validators/RelationshipValidators';

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

  router.put(
    '/:id',
    authMiddleware.authenticate,
    authorize(Permission.RELATIONSHIP_WRITE),
    validate(UpdateRelationshipSchema),
    controller.update.bind(controller)
  );

  router.delete(
    '/:id',
    authMiddleware.authenticate,
    authorize(Permission.RELATIONSHIP_DELETE),
    controller.delete.bind(controller)
  );

  router.get(
    '/',
    authMiddleware.authenticate,
    authorize(Permission.RELATIONSHIP_READ),
    controller.list.bind(controller)
  );

  router.get(
    '/:id',
    authMiddleware.authenticate,
    authorize(Permission.RELATIONSHIP_READ),
    controller.get.bind(controller)
  );

  return router;
};