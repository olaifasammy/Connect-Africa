import { Router } from 'express';
import { SearchController } from '../controllers/SearchController';
import { AutocompleteController } from '../controllers/AutocompleteController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/public';

import { validate } from '../middleware/SearchValidationMiddleware';
import { SearchQuerySchema, AutocompleteRequestSchema, IndexDocumentSchema, BulkIndexSchema, RebuildIndexSchema, GraphSearchSchema, SuggestionRequestSchema } from '../validation/SearchValidation';

export const createSearchRoutes = (
    controller: SearchController,
    autocompleteController: AutocompleteController,
    authMiddleware: AuthenticationMiddleware
): Router => {
  const router = Router();
  router.use(authMiddleware.authenticate);

  router.get('/', validate(SearchQuerySchema), authorize(Permission.SEARCH_READ), controller.search.bind(controller));
  router.get('/autocomplete', validate(AutocompleteRequestSchema), authorize(Permission.SEARCH_READ), autocompleteController.autocomplete.bind(autocompleteController));
  router.post('/index', validate(IndexDocumentSchema), authorize(Permission.SEARCH_WRITE), controller.indexDocument.bind(controller));
  router.put('/index/:id', validate(IndexDocumentSchema), authorize(Permission.SEARCH_WRITE), controller.updateIndex.bind(controller));
  router.delete('/index/:id', authorize(Permission.SEARCH_WRITE), controller.deleteIndex.bind(controller));
  router.post('/index/bulk', validate(BulkIndexSchema), authorize(Permission.SEARCH_WRITE), controller.bulkIndex.bind(controller));
  router.post('/index/:name/rebuild', validate(RebuildIndexSchema), authorize(Permission.SEARCH_WRITE), controller.rebuildIndex.bind(controller));
  router.post('/graph', validate(GraphSearchSchema), authorize(Permission.SEARCH_READ), controller.graphSearch.bind(controller));
  router.get('/suggestions', validate(SuggestionRequestSchema), authorize(Permission.SEARCH_READ), controller.getSuggestions.bind(controller));
  
  return router;
};
