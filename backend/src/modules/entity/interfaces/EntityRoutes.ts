import { Router } from 'express';
import { EntityController } from './EntityController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { metricsMiddleware } from '@shared/interfaces/http/middleware/MetricsMiddleware';
import { CreateEntitySchema } from '@modules/entity/application/dto/CreateEntityRequest';
import { UpdateEntitySchema } from '@modules/entity/application/dto/UpdateEntityRequest';
import { Permission } from '@modules/auth/domain/policies/rbac/Permissions';

export const createEntityRoutes = (controller: EntityController, authMiddleware: AuthenticationMiddleware): Router => {
  const router = Router();

  // Apply Metrics
  router.use(metricsMiddleware);

  // Apply Auth to all routes
  router.use(authMiddleware.authenticate);

  router.post('/', 
    authorize(Permission.USER_WRITE),
    validate(CreateEntitySchema),
    (req, res) => controller.create(req, res)
  );

  router.put('/:id', 
    authorize(Permission.USER_WRITE),
    validate(UpdateEntitySchema),
    (req, res) => controller.update(req, res)
  );

  router.delete('/:id', 
    authorize(Permission.USER_WRITE),
    (req, res) => controller.delete(req, res)
  );

  router.post('/:id/publish', 
    authorize(Permission.USER_WRITE),
    (req, res) => controller.publish(req, res)
  );

  router.post('/:id/archive', 
    authorize(Permission.USER_WRITE),
    (req, res) => controller.archive(req, res)
  );

  router.post('/:id/restore', 
    authorize(Permission.USER_WRITE),
    (req, res) => controller.restore(req, res)
  );

  router.post('/merge', 
    authorize(Permission.USER_WRITE),
    (req, res) => controller.merge(req, res)
  );

  router.post('/:id/alias', 
    authorize(Permission.USER_WRITE),
    (req, res) => controller.addAlias(req, res)
  );

  router.delete('/:id/alias', 
    authorize(Permission.USER_WRITE),
    (req, res) => controller.removeAlias(req, res)
  );

  router.post('/:id/version', 
    authorize(Permission.USER_WRITE),
    (req, res) => controller.createVersion(req, res)
  );
  
  return router;
};
