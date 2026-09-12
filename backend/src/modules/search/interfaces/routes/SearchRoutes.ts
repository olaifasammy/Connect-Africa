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
  autocompleteController:
    AutocompleteController,
  authMiddleware:
    AuthenticationMiddleware,
): Router => {
  const router =
    Router();

  router.use(
    authMiddleware.authenticate,
  );

  router.get(
    '/',
    validate(
      SearchQuerySchema,
    ),
    authorize(
      Permission.SEARCH_READ,
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
    authorize(
      Permission.SEARCH_READ,
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
    authorize(
      Permission.SEARCH_READ,
    ),
    controller.getSuggestions.bind(
      controller,
    ),
  );

  router.post(
    '/:name/rebuild',
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