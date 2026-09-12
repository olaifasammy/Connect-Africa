import { Router } from 'express';
import { z } from 'zod';

import { OntologyController } from '@modules/ontology/interfaces/controllers/OntologyController';

import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';

import { Permission } from '@modules/auth/public';

import {
  validate,
  validateQuery,
} from '@shared/interfaces/http/middleware/ZodValidationMiddleware';

import { ListQuerySchema } from '@shared/interfaces/http/schemas/ListQuerySchema';

import {
  CreateOntologySchema,
  UpdateOntologySchema,
  CreateEntityTypeSchema,
  CreateRelationshipTypeSchema,
  CreateOntologyVersionSchema,
  CreateEntityTypePropertySchema,
  UpdateEntityTypePropertySchema,
  IdParamSchema,
  EntityTypeIdParamSchema,
} from '@modules/ontology/application/dto/OntologyValidationDto';

const OntologyIdParamSchema = z.object({
  ontologyId: z.string().uuid(),
});

export const ontologyRoutes = (
  controller: OntologyController,
  auth: AuthenticationMiddleware,
) => {
  const router = Router();

  /*
   * Static routes must be registered before /:id.
   */

  // Ontology search
  router.get(
    '/search',
    auth.authenticate,
    authorize(Permission.ONTOLOGY_READ),
    validateQuery(
      z.object({
        q: z.string().trim().min(1),
      }),
    ),
    (req, res) =>
      controller.search(req, res),
  );

  // Entity Types
  router.get(
    '/entity-types/:id',
    auth.authenticate,
    authorize(Permission.ENTITY_TYPE_READ),
    validate(IdParamSchema),
    (req, res) =>
      controller.getEntityType(req, res),
  );

  router.get(
    '/:ontologyId/entity-types',
    auth.authenticate,
    authorize(Permission.ENTITY_TYPE_READ),
    validate(OntologyIdParamSchema),
    (req, res) =>
      controller.listEntityTypes(req, res),
  );

  router.post(
    '/:ontologyId/entity-types',
    auth.authenticate,
    authorize(Permission.ENTITY_TYPE_WRITE),
    validate(OntologyIdParamSchema),
    validate(CreateEntityTypeSchema),
    (req, res) =>
      controller.createEntityType(req, res),
  );

  // Entity Type Properties
  router.get(
    '/entity-type-properties/:id',
    auth.authenticate,
    authorize(Permission.ENTITY_TYPE_READ),
    validate(IdParamSchema),
    (req, res) =>
      controller.getEntityTypeProperty(req, res),
  );

  router.get(
    '/entity-types/:entityTypeId/properties',
    auth.authenticate,
    authorize(Permission.ENTITY_TYPE_READ),
    validate(EntityTypeIdParamSchema),
    (req, res) =>
      controller.listEntityTypeProperties(req, res),
  );

  router.post(
    '/entity-types/:entityTypeId/properties',
    auth.authenticate,
    authorize(Permission.ENTITY_TYPE_WRITE),
    validate(EntityTypeIdParamSchema),
    validate(CreateEntityTypePropertySchema),
    (req, res) =>
      controller.createEntityTypeProperty(req, res),
  );

  router.put(
    '/entity-type-properties/:id',
    auth.authenticate,
    authorize(Permission.ENTITY_TYPE_WRITE),
    validate(IdParamSchema),
    validate(UpdateEntityTypePropertySchema),
    (req, res) =>
      controller.updateEntityTypeProperty(req, res),
  );

  router.delete(
    '/entity-type-properties/:id',
    auth.authenticate,
    authorize(Permission.ENTITY_TYPE_WRITE),
    validate(IdParamSchema),
    (req, res) =>
      controller.deleteEntityTypeProperty(req, res),
  );

  // Relationship Types
  router.get(
    '/relationship-types/:id',
    auth.authenticate,
    authorize(Permission.RELATIONSHIP_TYPE_READ),
    validate(IdParamSchema),
    (req, res) =>
      controller.getRelationshipType(req, res),
  );

  router.get(
    '/:ontologyId/relationship-types',
    auth.authenticate,
    authorize(Permission.RELATIONSHIP_TYPE_READ),
    validate(OntologyIdParamSchema),
    (req, res) =>
      controller.listRelationshipTypes(req, res),
  );

  router.post(
    '/:ontologyId/relationship-types',
    auth.authenticate,
    authorize(Permission.RELATIONSHIP_TYPE_WRITE),
    validate(OntologyIdParamSchema),
    validate(CreateRelationshipTypeSchema),
    (req, res) =>
      controller.createRelationshipType(req, res),
  );

  // Ontology Versions
  router.get(
    '/versions/:id',
    auth.authenticate,
    authorize(Permission.ONTOLOGY_VERSION_READ),
    validate(IdParamSchema),
    (req, res) =>
      controller.getVersion(req, res),
  );

  router.post(
    '/versions/:id/publish',
    auth.authenticate,
    authorize(Permission.ONTOLOGY_VERSION_WRITE),
    validate(IdParamSchema),
    (req, res) =>
      controller.publishVersion(req, res),
  );

  router.post(
    '/versions/:id/rollback',
    auth.authenticate,
    authorize(Permission.ONTOLOGY_VERSION_WRITE),
    validate(IdParamSchema),
    (req, res) =>
      controller.rollbackVersion(req, res),
  );

  router.post(
    '/:ontologyId/versions',
    auth.authenticate,
    authorize(Permission.ONTOLOGY_VERSION_WRITE),
    validate(OntologyIdParamSchema),
    validate(CreateOntologyVersionSchema),
    (req, res) =>
      controller.createVersion(req, res),
  );

  // Ontology
  router.post(
    '/',
    auth.authenticate,
    authorize(Permission.ONTOLOGY_CREATE),
    validate(CreateOntologySchema),
    (req, res) =>
      controller.create(req, res),
  );

  router.get(
    '/',
    auth.authenticate,
    authorize(Permission.ONTOLOGY_READ),
    validateQuery(ListQuerySchema),
    (req, res) =>
      controller.list(req, res),
  );

  router.put(
    '/:id',
    auth.authenticate,
    authorize(Permission.ONTOLOGY_WRITE),
    validate(IdParamSchema),
    validate(UpdateOntologySchema),
    (req, res) =>
      controller.update(req, res),
  );

  router.post(
    '/:id/archive',
    auth.authenticate,
    authorize(Permission.ONTOLOGY_WRITE),
    validate(IdParamSchema),
    (req, res) =>
      controller.archive(req, res),
  );

  router.get(
    '/:id',
    auth.authenticate,
    authorize(Permission.ONTOLOGY_READ),
    validate(IdParamSchema),
    (req, res) =>
      controller.get(req, res),
  );

  return router;
};