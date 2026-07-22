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
const NotificationEntities_1 = require("../entities/NotificationEntities");
const PreferenceService_1 = require("./PreferenceService");
const EventBus_1 = require("../../../../shared/infrastructure/queue/EventBus");
const NotificationEvents_1 = require("../events/NotificationEvents");
const public_1 = require("../../../ai/public");
const NotificationValueObjects_1 = require("../value-objects/NotificationValueObjects");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
let NotificationAiIntegrationService = class NotificationAiIntegrationService {
    repository;
    preferenceService;
    eventBus;
    aiGateway;
    constructor(repository, preferenceService, eventBus, aiGateway) {
        this.repository = repository;
        this.preferenceService = preferenceService;
        this.eventBus = eventBus;
        this.aiGateway = aiGateway;
    }
    async sendAiNotification(recipientId, message) {
        // 1. Log or preprocess via AI Gateway if needed (e.g., sanitization)
        const aiResponse = await this.aiGateway.processRequest({
            prompt: message,
            templateName: 'sanitize_message'
        });
        const sanitizedMessage = aiResponse.content;
        // 2. Create notification entity
        const notification = new NotificationEntities_1.Notification(new NotificationValueObjects_1.NotificationId(new UniqueEntityId_1.UniqueEntityId().toString()), new NotificationValueObjects_1.RecipientId(recipientId), new NotificationValueObjects_1.TemplateId("AI_ALERT"), NotificationValueObjects_1.ChannelType.IN_APP, NotificationValueObjects_1.DeliveryStatus.PENDING, new Date());
        // 3. Persist and send
        await this.repository.save(notification);
        await this.eventBus.publish(new NotificationEvents_1.NotificationSentEvent(notification.id));
        console.log(`[NOTIFICATION_AI] Sent AI alert to ${recipientId}`);
    }
};
exports.NotificationAiIntegrationService = NotificationAiIntegrationService;
exports.NotificationAiIntegrationService = NotificationAiIntegrationService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('INotificationRepository')),
    __param(1, (0, inversify_1.inject)(PreferenceService_1.PreferenceService)),
    __param(2, (0, inversify_1.inject)('EventBus')),
    __param(3, (0, inversify_1.inject)(public_1.AIGatewayService)),
    __metadata("design:paramtypes", [Object, PreferenceService_1.PreferenceService,
        EventBus_1.EventBus,
        public_1.AIGatewayService])
], NotificationAiIntegrationService);
//# sourceMappingURL=NotificationAiIntegrationService.js.map