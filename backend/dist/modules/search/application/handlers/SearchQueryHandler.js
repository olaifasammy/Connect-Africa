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
exports.SearchQueryHandler = void 0;
const inversify_1 = require("inversify");
const SearchAnalyticsHelper_1 = require("../../infrastructure/analytics/SearchAnalyticsHelper");
let SearchQueryHandler = class SearchQueryHandler {
    searchRepository;
    metricsProvider;
    analytics;
    constructor(searchRepository, metricsProvider) {
        this.searchRepository = searchRepository;
        this.metricsProvider = metricsProvider;
        this.analytics = new SearchAnalyticsHelper_1.SearchAnalyticsHelper(metricsProvider);
    }
    async handle(query) {
        const { request } = query;
        const page = request.page || 1;
        const limit = request.limit || 10;
        const offset = (page - 1) * limit;
        const startTime = Date.now();
        const { documents, facets } = await this.searchRepository.search(request.query, request.filters, request.sortBy, request.sortOrder, limit, offset, request.includeFacets);
        const duration = Date.now() - startTime;
        this.analytics.logSearch(request.query, documents.length, duration);
        const results = documents.map(doc => ({
            id: doc.id.toString(),
            title: doc.content?.title || 'Untitled',
            resourceType: doc.resourceType,
            snippet: doc.content?.snippet || '',
            score: 0.0 // TODO: Properly map rank/score from SearchDocument
        }));
        return {
            results,
            total: results.length, // TODO: Update ISearchRepository to return total count for pagination
            page,
            limit,
            facets
        };
    }
};
exports.SearchQueryHandler = SearchQueryHandler;
exports.SearchQueryHandler = SearchQueryHandler = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ISearchRepository')),
    __param(1, (0, inversify_1.inject)('IMetricsProvider')),
    __metadata("design:paramtypes", [Object, Object])
], SearchQueryHandler);
//# sourceMappingURL=SearchQueryHandler.js.map