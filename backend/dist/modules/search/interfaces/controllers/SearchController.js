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
exports.SearchController = void 0;
const inversify_1 = require("inversify");
const SearchQueryHandler_1 = require("../../application/handlers/SearchQueryHandler");
const SearchQuery_1 = require("../../application/queries/SearchQuery");
let SearchController = class SearchController {
    searchQueryHandler;
    constructor(searchQueryHandler) {
        this.searchQueryHandler = searchQueryHandler;
    }
    async search(req, res) {
        const requestDto = {
            query: req.query.q,
            page: req.query.page ? parseInt(req.query.page) : 1,
            limit: req.query.limit ? parseInt(req.query.limit) : 10,
            filters: {
                resourceType: req.query.resourceType
            },
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder
        };
        if (!requestDto.query) {
            res.status(400).json({ success: false, errors: [{ code: 'INVALID_QUERY', message: 'Query parameter is required' }] });
            return;
        }
        const query = new SearchQuery_1.SearchQuery(requestDto);
        const result = await this.searchQueryHandler.handle(query);
        res.json({ success: true, data: result });
    }
};
exports.SearchController = SearchController;
exports.SearchController = SearchController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(SearchQueryHandler_1.SearchQueryHandler)),
    __metadata("design:paramtypes", [SearchQueryHandler_1.SearchQueryHandler])
], SearchController);
//# sourceMappingURL=SearchController.js.map