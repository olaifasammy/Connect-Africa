"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SearchQueryHandler_1 = require("../../../../../search/application/handlers/SearchQueryHandler");
const SearchQuery_1 = require("../../../../../search/application/queries/SearchQuery");
const SearchDocument_1 = require("../../../../../search/domain/models/SearchDocument");
const UniqueEntityId_1 = require("../../../../../../shared/domain/UniqueEntityId");
describe('SearchQueryHandler', () => {
    let handler;
    let mockRepository;
    let mockMetrics;
    beforeEach(() => {
        mockRepository = {
            findById: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            search: jest.fn(),
            bulkSave: jest.fn(),
            autocomplete: jest.fn(),
            getSuggestions: jest.fn(),
            getTrending: jest.fn(),
            runInTransaction: jest.fn(),
        };
        mockMetrics = {
            incrementCounter: jest.fn(),
            observeDuration: jest.fn(),
        };
        handler = new SearchQueryHandler_1.SearchQueryHandler(mockRepository, mockMetrics);
    });
    it('should return search results', async () => {
        const document = new SearchDocument_1.SearchDocument(new UniqueEntityId_1.UniqueEntityId(), 'entity', new UniqueEntityId_1.UniqueEntityId(), { title: 'Test' });
        mockRepository.search.mockResolvedValue({ documents: [document] });
        const query = new SearchQuery_1.SearchQuery({ query: 'test' });
        const result = await handler.handle(query);
        expect(result.results).toHaveLength(1);
        expect(result.results[0].title).toBe('Test');
        expect(mockRepository.search).toHaveBeenCalledWith('test', undefined, undefined, undefined, 10, 0, undefined);
    });
});
//# sourceMappingURL=SearchQueryHandler.spec.js.map