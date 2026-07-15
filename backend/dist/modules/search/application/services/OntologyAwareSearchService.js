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
exports.OntologyAwareSearchService = void 0;
const inversify_1 = require("inversify");
let OntologyAwareSearchService = class OntologyAwareSearchService {
    ontologyGraphService;
    searchRepository;
    constructor(ontologyGraphService, searchRepository) {
        this.ontologyGraphService = ontologyGraphService;
        this.searchRepository = searchRepository;
    }
    async search(query, filters, entityTypeId) {
        // Validate entity type if provided
        if (entityTypeId) {
            const isValid = await this.ontologyGraphService.validateEntityType(entityTypeId);
            if (!isValid) {
                throw new Error(`Invalid entity type: ${entityTypeId}`);
            }
            filters = { ...filters, resourceType: entityTypeId };
        }
        // Perform search
        return await this.searchRepository.search(query, filters);
    }
};
exports.OntologyAwareSearchService = OntologyAwareSearchService;
exports.OntologyAwareSearchService = OntologyAwareSearchService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IOntologyGraphService')),
    __param(1, (0, inversify_1.inject)('ISearchRepository')),
    __metadata("design:paramtypes", [Object, Object])
], OntologyAwareSearchService);
//# sourceMappingURL=OntologyAwareSearchService.js.map