import {
  Router,
} from 'express';

import {
  SearchController,
} from '../controllers/SearchController';

import {
  AutocompleteController,
} from '../controllers/AutocompleteController';

import {
  AuthenticationMiddleware,
} from '@shared/interfaces/http/middleware/AuthenticationMiddleware';

import {
  authorize,
} from '@shared/interfaces/http/middleware/AuthorizationMiddleware';

import {
  Permission,
} from '@modules/auth/public';

import {
  validate,
} from '../middleware/SearchValidationMiddleware';

import {
  SearchQuerySchema,
  AutocompleteRequestSchema,
  RebuildIndexSchema,
  SuggestionRequestSchema,
} from '../validation/SearchValidation';

export const createSearchRoutes = (
  controller: SearchController,
  autocompleteController: AutocompleteController,
  authMiddleware: AuthenticationMiddleware,
): Router => {
  const router = Router();

  /*
   * Public knowledge discovery.
   *
   * Search, autocomplete and suggestions are intentionally
   * public because Connect-Africa's knowledge graph is a
   * discovery surface, not an authenticated-only resource.
   */

  router.get(
    '/',
    validate(
      SearchQuerySchema,
    ),
    controller.search.bind(
      controller,
    ),
  );

  router.get(
    '/autocomplete',
    validate(
      AutocompleteRequestSchema,
    ),
    autocompleteController.autocomplete.bind(
      autocompleteController,
    ),
  );

  router.get(
    '/suggestions',
    validate(
      SuggestionRequestSchema,
    ),
    controller.getSuggestions.bind(
      controller,
    ),
  );

  /*
   * Index administration remains protected.
   */
  router.post(
    '/:name/rebuild',
    authMiddleware.authenticate,
    validate(
      RebuildIndexSchema,
    ),
    authorize(
      Permission.SEARCH_WRITE,
    ),
    controller.rebuildIndex.bind(
      controller,
    ),
  );

  return router;
};
