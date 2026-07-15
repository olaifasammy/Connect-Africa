"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HybridSearchService = void 0;
const inversify_1 = require("inversify");
let HybridSearchService = class HybridSearchService {
    semanticProvider;
    searchRepository;
    constructor(semanticProvider, searchRepository) {
        this.semanticProvider = semanticProvider;
        this.searchRepository = searchRepository;
    }
    async search(query, limit = 10) {
        // 1. Get embedding for the query
        const embedding = await this.semanticProvider.embed(query);
        // 2. Perform semantic search to get IDs
        const semanticIds = await this.semanticProvider.search(embedding, limit * 2);
        // 3. Perform full-text search using existing repository
        const fullTextResults = await this.searchRepository.search(query, undefined, 'relevance', 'desc', limit * 2);
        // 4. Combine and deduplicate (Simple implementation, can be improved with RRF)
        const combinedResults = new Map();
        for (const doc of fullTextResults.documents) {
            combinedResults.set(doc.id.toString(), doc);
        }
        // Placeholder for fetching documents by IDs from semantic search
        // In a production system, these would be fetched efficiently.
        return Array.from(combinedResults.values()).slice(0, limit);
    }
};
exports.HybridSearchService = HybridSearchService;
exports.HybridSearchService = HybridSearchService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ISemanticSearchProvider')),
    __param(1, (0, inversify_1.inject)('ISearchRepository')),
    __metadata("design:paramtypes", [Object, Object])
], HybridSearchService);
//# sourceMappingURL=HybridSearchService.js.map