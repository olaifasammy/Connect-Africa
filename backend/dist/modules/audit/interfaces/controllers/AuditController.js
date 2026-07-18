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
exports.AuditController = void 0;
const inversify_1 = require("inversify");
const RecordAuditCommandHandler_1 = require("../../application/handlers/RecordAuditCommandHandler");
const SearchAuditQueryHandler_1 = require("../../application/handlers/SearchAuditQueryHandler");
const RecordAuditDto_1 = require("../../application/dto/RecordAuditDto");
let AuditController = class AuditController {
    recordAuditCommandHandler;
    searchAuditQueryHandler;
    constructor(recordAuditCommandHandler, searchAuditQueryHandler) {
        this.recordAuditCommandHandler = recordAuditCommandHandler;
        this.searchAuditQueryHandler = searchAuditQueryHandler;
    }
    async record(req, res) {
        const data = RecordAuditDto_1.RecordAuditRequestSchema.parse(req.body);
        await this.recordAuditCommandHandler.execute({ data });
        res.status(201).json({ success: true });
    }
    async search(req, res) {
        const { userId, resourceId } = req.query;
        const results = await this.searchAuditQueryHandler.execute({
            criteria: { userId: userId, resourceId: resourceId }
        });
        res.json({ success: true, data: results });
    }
};
exports.AuditController = AuditController;
exports.AuditController = AuditController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('RecordAuditCommandHandler')),
    __param(1, (0, inversify_1.inject)('SearchAuditQueryHandler')),
    __metadata("design:paramtypes", [RecordAuditCommandHandler_1.RecordAuditCommandHandler,
        SearchAuditQueryHandler_1.SearchAuditQueryHandler])
], AuditController);
//# sourceMappingURL=AuditController.js.map