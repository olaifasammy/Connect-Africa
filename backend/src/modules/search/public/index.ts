// Services
export { HybridSearchService } from '../application/services/HybridSearchService';

// Handlers
export { SearchQueryHandler } from '../application/handlers/SearchQueryHandler';
export { AutocompleteQueryHandler } from '../application/handlers/AutocompleteQueryHandler';

// Infrastructure & Interfaces
export { SearchProvider } from '../infrastructure/search/SearchProvider';
export { PostgresSearchProvider } from '../infrastructure/search/PostgresSearchProvider';
export { SearchRepository } from '../infrastructure/repositories/SearchRepository';
export { SearchController } from '../interfaces/controllers/SearchController';
export { AutocompleteController } from '../interfaces/controllers/AutocompleteController';
