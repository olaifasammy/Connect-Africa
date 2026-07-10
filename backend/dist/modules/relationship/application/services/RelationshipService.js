"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipService = void 0;
const Relationship_1 = require("../../domain/entities/Relationship");
const RelationshipValueObjects_1 = require("../../domain/value-objects/RelationshipValueObjects");
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
const Logger_1 = require("../../../../shared/logger/Logger");
/**
 * Application service orchestrating relationship operations with Audit and Event support.
 */
class RelationshipService {
    repository;
    validationService;
    eventBus;
    constructor(repository, validationService, eventBus) {
        this.repository = repository;
        this.validationService = validationService;
        this.eventBus = eventBus;
    }
    async createRelationship(command) {
        const relationship = Relationship_1.Relationship.create(new RelationshipValueObjects_1.RelationshipId(), new RelationshipValueObjects_1.EntityId(command.sourceEntityId), new RelationshipValueObjects_1.EntityId(command.targetEntityId), new RelationshipValueObjects_1.RelationshipTypeId(command.relationshipTypeId));
        await this.validationService.validate(relationship);
        await this.repository.save(relationship);
        // Audit Logging
        AuditLogger_1.AuditLogger.log({
            user: command.userId,
            action: 'CREATE_RELATIONSHIP',
            resource: 'RELATIONSHIP',
            status: 'SUCCESS'
        });
        // Domain Event Publishing
        await this.eventBus.publish(relationship.domainEvents);
        relationship.clearDomainEvents();
        Logger_1.logger.info(`Relationship created: ${relationship.id.toString()}`);
    }
}
exports.RelationshipService = RelationshipService;
//# sourceMappingURL=RelationshipService.js.map