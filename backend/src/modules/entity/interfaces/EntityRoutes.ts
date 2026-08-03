import { Router } from 'express';
import { EntityController } from './EntityController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { metricsMiddleware } from '@shared/interfaces/http/middleware/MetricsMiddleware';
import { CreateEntitySchema, MergeEntitiesSchema, AliasSchema } from '@modules/entity/application/dto/CreateEntityRequest';
import { UpdateEntitySchema } from '@modules/entity/application/dto/UpdateEntityRequest';
import { Permission } from '@modules/auth/public';

export const createEntityRoutes = (controller: EntityController, authMiddleware: AuthenticationMiddleware): Router => {
  const router = Router();

  // Apply Metrics
  router.use(metricsMiddleware);

  // Apply Auth to all routes
  router.use(authMiddleware.authenticate);

  router.post('/', 
    authorize(Permission.ENTITY_CREATE),
    validate(CreateEntitySchema),
    (req, res) => controller.create(req, res)
  );

  router.put('/:id', 
    authorize(Permission.ENTITY_WRITE),
    validate(UpdateEntitySchema),
    (req, res) => controller.update(req, res)
  );

  router.delete('/:id', 
    authorize(Permission.ENTITY_DELETE),
    (req, res) => controller.delete(req, res)
  );

  router.post('/:id/publish', 
    authorize(Permission.ENTITY_WRITE),
    (req, res) => controller.publish(req, res)
  );

  router.post('/:id/archive', 
    authorize(Permission.ENTITY_WRITE),
    (req, res) => controller.archive(req, res)
  );

  router.post('/:id/restore', 
    authorize(Permission.ENTITY_WRITE),
    (req, res) => controller.restore(req, res)
  );

  router.post('/merge',
  authorize(Permission.ENTITY_WRITE),
  validate(MergeEntitiesSchema),
    (req, res) => controller.merge(req, res)
  );

  router.post('/:id/alias',
  authorize(Permission.ENTITY_WRITE),
    validate(AliasSchema),
    (req, res) => controller.addAlias(req, res)
  );

  router.delete('/:id/alias', 
    authorize(Permission.ENTITY_WRITE),
    (req, res) => controller.removeAlias(req, res)
  );

  router.post('/:id/version', 
    authorize(Permission.ENTITY_VERSION_WRITE),
    (req, res) => controller.createVersion(req, res)
  );
  
  router.get('/',
    authorize(Permission.ENTITY_READ),
    (req, res) => controller.list(req, res)
  );

  router.get('/search',
    authorize(Permission.ENTITY_READ),
    (req, res) => controller.search(req, res)
  );

  router.get('/:id',
    authorize(Permission.ENTITY_READ),
    (req, res) => controller.get(req, res)
  );

  router.get('/identifier/:identifier',
    authorize(Permission.ENTITY_READ),
    (req, res) => controller.getByIdentifier(req, res)
  );

  router.get('/slug/:slug',
    authorize(Permission.ENTITY_READ),
    (req, res) => controller.getBySlug(req, res)
  );

  router.get('/:id/aliases',
    authorize(Permission.ENTITY_READ),
    (req, res) => controller.listAliases(req, res)
  );

  router.get('/:id/versions/:versionId',
    authorize(Permission.ENTITY_VERSION_READ),
    (req, res) => controller.getVersion(req, res)
  );

  return router;
};
