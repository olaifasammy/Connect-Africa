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
exports.NotificationService = void 0;
const inversify_1 = require("inversify");
const NotificationPolicies_1 = require("../policies/NotificationPolicies");
const PreferenceService_1 = require("../services/PreferenceService");
const EventBus_1 = require("../../../../shared/infrastructure/queue/EventBus");
const NotificationEvents_1 = require("../events/NotificationEvents");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
let NotificationService = class NotificationService {
    repository;
    preferenceService;
    eventBus;
    constructor(repository, preferenceService, eventBus) {
        this.repository = repository;
        this.preferenceService = preferenceService;
        this.eventBus = eventBus;
    }
    async send(notification) {
        const preference = await this.preferenceService.getPreference(notification.recipientId);
        if (preference && !new NotificationPolicies_1.UserPreferencePolicy().isChannelEnabled(preference)) {
            return;
        }
        if (!new NotificationPolicies_1.DeliveryPolicy().isEligible(notification)) {
            throw new Error('Notification not eligible for delivery');
        }
        await this.repository.save(notification);
        await this.eventBus.publish(new NotificationEvents_1.NotificationSentEvent(notification.id));
        // Decoupled audit logging
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: "NotificationSent",
            actorId: "SYSTEM",
            actorType: "SYSTEM",
            ipAddress: "0.0.0.0",
            userAgent: "SYSTEM",
            resourceId: notification.id.value,
            resourceType: "Notification",
            metadata: [{ key: "recipientId", value: notification.recipientId.value }]
        }));
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('INotificationRepository')),
    __param(1, (0, inversify_1.inject)(PreferenceService_1.PreferenceService)),
    __param(2, (0, inversify_1.inject)('EventBus')),
    __metadata("design:paramtypes", [Object, PreferenceService_1.PreferenceService,
        EventBus_1.EventBus])
], NotificationService);
//# sourceMappingURL=NotificationService.js.map