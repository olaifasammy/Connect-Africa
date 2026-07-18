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
exports.SearchAuditQueryHandler = void 0;
const inversify_1 = require("inversify");
const AuditSearchService_1 = require("../../domain/services/AuditSearchService");
let SearchAuditQueryHandler = class SearchAuditQueryHandler {
    auditSearchService;
    constructor(auditSearchService) {
        this.auditSearchService = auditSearchService;
    }
    async execute(query) {
        const entries = await this.auditSearchService.search(query.criteria);
        return entries.map(entry => ({
            id: entry.id.toString(),
            correlationId: entry.correlationId.getProps().value,
            actor: {
                id: entry.actor.id.toString(),
                type: entry.actor.actorType
            },
            resource: {
                id: entry.resource.resourceId.toString(),
                type: entry.resource.type
            },
            action: entry.action,
            timestamp: entry.timestamp.getProps().value.toISOString(),
            metadata: entry.metadata.map(m => ({
                key: m.key,
                value: m.value
            }))
        }));
    }
};
exports.SearchAuditQueryHandler = SearchAuditQueryHandler;
exports.SearchAuditQueryHandler = SearchAuditQueryHandler = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('AuditSearchService')),
    __metadata("design:paramtypes", [AuditSearchService_1.AuditSearchService])
], SearchAuditQueryHandler);
//# sourceMappingURL=SearchAuditQueryHandler.js.map