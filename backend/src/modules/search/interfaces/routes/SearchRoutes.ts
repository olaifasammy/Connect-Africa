import { Router } from 'express';
import { container } from '../../../../bootstrap/container/container';
import { SearchController } from '../controllers/SearchController';
import { AutocompleteController } from '../controllers/AutocompleteController';

export const SearchRoutes = Router();
const searchController = container.resolve(SearchController);
const autocompleteController = container.resolve(AutocompleteController);

SearchRoutes.get('/', searchController.search.bind(searchController));
SearchRoutes.get('/autocomplete', autocompleteController.autocomplete.bind(autocompleteController));
