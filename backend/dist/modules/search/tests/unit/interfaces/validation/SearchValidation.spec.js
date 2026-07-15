"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SearchValidation_1 = require("../../../../../search/interfaces/validation/SearchValidation");
describe('SearchRequestSchema', () => {
    it('should validate a valid search request', () => {
        const validRequest = {
            query: 'test',
            page: 1,
            limit: 10,
            filters: { resourceType: 'article' },
            sortBy: 'relevance',
            sortOrder: 'desc',
            includeFacets: ['resourceType']
        };
        const result = SearchValidation_1.SearchRequestSchema.safeParse(validRequest);
        expect(result.success).toBe(true);
    });
    it('should fail if query is missing', () => {
        const invalidRequest = {
            page: 1
        };
        const result = SearchValidation_1.SearchRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
    });
    it('should fail if sortBy is invalid', () => {
        const invalidRequest = {
            query: 'test',
            sortBy: 'invalid'
        };
        const result = SearchValidation_1.SearchRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
    });
});
//# sourceMappingURL=SearchValidation.spec.js.map