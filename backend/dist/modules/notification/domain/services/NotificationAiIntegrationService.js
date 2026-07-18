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
exports.NotificationAiIntegrationService = void 0;
const inversify_1 = require("inversify");
const PreferenceService_1 = require("./PreferenceService");
const EventBus_1 = require("../../../../shared/infrastructure/queue/EventBus");
let NotificationAiIntegrationService = class NotificationAiIntegrationService {
    repository;
    preferenceService;
    eventBus;
    constructor(repository, preferenceService, eventBus) {
        this.repository = repository;
        this.preferenceService = preferenceService;
        this.eventBus = eventBus;
    }
    async sendAiNotification(recipientId, message) {
        // Logic to wrap AI generated messages and send via existing Notification infrastructure
        console.log(`[NOTIFICATION_AI] Sending AI alert to ${recipientId}: ${message}`);
        // publish event or trigger send as needed
    }
};
exports.NotificationAiIntegrationService = NotificationAiIntegrationService;
exports.NotificationAiIntegrationService = NotificationAiIntegrationService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('INotificationRepository')),
    __param(1, (0, inversify_1.inject)(PreferenceService_1.PreferenceService)),
    __param(2, (0, inversify_1.inject)('EventBus')),
    __metadata("design:paramtypes", [Object, PreferenceService_1.PreferenceService,
        EventBus_1.EventBus])
], NotificationAiIntegrationService);
//# sourceMappingURL=NotificationAiIntegrationService.js.map