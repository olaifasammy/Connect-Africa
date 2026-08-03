import { Router } from 'express';
import { OntologyController } from '@modules/ontology/interfaces/controllers/OntologyController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/public';

export const ontologyRoutes = (controller: OntologyController, auth: AuthenticationMiddleware) => {
  const router = Router();
  router.post('/', auth.authenticate, authorize(Permission.ONTOLOGY_CREATE), (req, res) => controller.create(req, res));
  router.put('/:id', auth.authenticate, authorize(Permission.ONTOLOGY_WRITE), (req, res) => controller.update(req, res));
  router.post('/:id/archive', auth.authenticate, authorize(Permission.ONTOLOGY_WRITE), (req, res) => controller.archive(req, res));
  router.get('/:id', auth.authenticate, authorize(Permission.ONTOLOGY_READ), (req, res) => controller.get(req, res));
  router.get('/', auth.authenticate, authorize(Permission.ONTOLOGY_READ), (req, res) => controller.list(req, res));
  router.get('/search', auth.authenticate, authorize(Permission.ONTOLOGY_READ), (req, res) => controller.search(req, res));

  // Entity Types
  router.post('/:ontologyId/entity-types', auth.authenticate, authorize(Permission.ENTITY_TYPE_WRITE), (req, res) => controller.createEntityType(req, res));
  router.get('/entity-types/:id', auth.authenticate, authorize(Permission.ENTITY_TYPE_READ), (req, res) => controller.getEntityType(req, res));
  router.get('/:ontologyId/entity-types', auth.authenticate, authorize(Permission.ENTITY_TYPE_READ), (req, res) => controller.listEntityTypes(req, res));

  // Relationship Types
  router.post('/:ontologyId/relationship-types', auth.authenticate, authorize(Permission.RELATIONSHIP_TYPE_WRITE), (req, res) => controller.createRelationshipType(req, res));
  router.get('/relationship-types/:id', auth.authenticate, authorize(Permission.RELATIONSHIP_TYPE_READ), (req, res) => controller.getRelationshipType(req, res));
  router.get('/:ontologyId/relationship-types', auth.authenticate, authorize(Permission.RELATIONSHIP_TYPE_READ), (req, res) => controller.listRelationshipTypes(req, res));

  // Versions
  router.post('/:ontologyId/versions', auth.authenticate, authorize(Permission.ONTOLOGY_VERSION_WRITE), (req, res) => controller.createVersion(req, res));
  router.post('/versions/:id/publish', auth.authenticate, authorize(Permission.ONTOLOGY_VERSION_WRITE), (req, res) => controller.publishVersion(req, res));
  router.post('/versions/:id/rollback/:versionId', auth.authenticate, authorize(Permission.ONTOLOGY_VERSION_WRITE), (req, res) => controller.rollbackVersion(req, res));
  router.get('/versions/:id', auth.authenticate, authorize(Permission.ONTOLOGY_VERSION_READ), (req, res) => controller.getVersion(req, res));
  return router;
};

