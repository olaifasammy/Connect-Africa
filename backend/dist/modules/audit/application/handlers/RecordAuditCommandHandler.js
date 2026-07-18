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
exports.RecordAuditCommandHandler = void 0;
const inversify_1 = require("inversify");
const AuditRecordingService_1 = require("../../domain/services/AuditRecordingService");
const AuditEntry_1 = require("../../domain/aggregates/AuditEntry");
const AuditActor_1 = require("../../domain/entities/AuditActor");
const AuditResource_1 = require("../../domain/entities/AuditResource");
const AuditMetadata_1 = require("../../domain/entities/AuditMetadata");
const AuditValueObjects_1 = require("../../domain/value-objects/AuditValueObjects");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
let RecordAuditCommandHandler = class RecordAuditCommandHandler {
    auditRecordingService;
    constructor(auditRecordingService) {
        this.auditRecordingService = auditRecordingService;
    }
    async execute(command) {
        const { data } = command;
        const auditEntry = AuditEntry_1.AuditEntry.create({
            action: data.action,
            actor: AuditActor_1.AuditActor.create({
                userId: new AuditValueObjects_1.UserId(data.actorId),
                actorType: data.actorType,
                ipAddress: new AuditValueObjects_1.IPAddress(data.ipAddress),
                userAgent: new AuditValueObjects_1.UserAgent(data.userAgent)
            }),
            resource: AuditResource_1.AuditResource.create({
                id: new AuditValueObjects_1.ResourceId(data.resourceId),
                type: data.resourceType
            }),
            metadata: (data.metadata || []).map(m => AuditMetadata_1.AuditMetadata.create({
                key: m.key,
                value: m.value
            })),
            correlationId: new AuditValueObjects_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new AuditValueObjects_1.Timestamp(new Date())
        });
        await this.auditRecordingService.record(auditEntry);
    }
};
exports.RecordAuditCommandHandler = RecordAuditCommandHandler;
exports.RecordAuditCommandHandler = RecordAuditCommandHandler = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('AuditRecordingService')),
    __metadata("design:paramtypes", [AuditRecordingService_1.AuditRecordingService])
], RecordAuditCommandHandler);
//# sourceMappingURL=RecordAuditCommandHandler.js.map