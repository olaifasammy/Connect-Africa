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
exports.GraphSearchHandler = void 0;
const inversify_1 = require("inversify");
let GraphSearchHandler = class GraphSearchHandler {
    graphRepository;
    constructor(graphRepository) {
        this.graphRepository = graphRepository;
    }
    async handle(query) {
        switch (query.type) {
            case 'neighbors':
                if (!query.entityId)
                    throw new Error('entityId is required for neighbors search');
                return await this.graphRepository.getNeighbors(query.entityId);
            case 'path':
                if (!query.startEntityId || !query.endEntityId)
                    throw new Error('startEntityId and endEntityId are required for path search');
                const pathNodes = await this.graphRepository.findShortestPath(query.startEntityId, query.endEntityId);
                return { nodes: pathNodes, edges: [] }; // Edges not supported in findShortestPath yet
            default:
                throw new Error(`Unsupported graph search type: ${query.type}`);
        }
    }
};
exports.GraphSearchHandler = GraphSearchHandler;
exports.GraphSearchHandler = GraphSearchHandler = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IGraphRepository')),
    __metadata("design:paramtypes", [Object])
], GraphSearchHandler);
//# sourceMappingURL=GraphSearchHandler.js.map