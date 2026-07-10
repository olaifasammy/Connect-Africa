"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTypeService = void 0;
const EntityType_1 = require("../../../ontology/domain/entities/EntityType");
const EntityTypeValidator_1 = require("../../../ontology/domain/validators/EntityTypeValidator");
const OntologyId_1 = require("../../../ontology/domain/value-objects/OntologyId");
const DomainError_1 = require("../../../ontology/domain/errors/DomainError");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class EntityTypeService {
    entityTypeRepository;
    ontologyRepository;
    entityTypeValidator;
    eventBus;
    constructor(entityTypeRepository, ontologyRepository, entityTypeValidator, eventBus) {
        this.entityTypeRepository = entityTypeRepository;
        this.ontologyRepository = ontologyRepository;
        this.entityTypeValidator = entityTypeValidator;
        this.eventBus = eventBus;
    }
    async createEntityType(ontologyId, dto, userId, ipAddress) {
        const ontology = await this.ontologyRepository.findById(OntologyId_1.OntologyId.create(ontologyId));
        if (!ontology) {
            throw new DomainError_1.DomainError('Ontology not found.');
        }
        const entityType = EntityType_1.EntityType.create({
            ontologyId: OntologyId_1.OntologyId.create(ontologyId),
            name: dto.name,
            description: dto.description
        });
        EntityTypeValidator_1.EntityTypeValidator.validate({ name: entityType.name, description: entityType.description });
        await this.entityTypeRepository.save(entityType);
        for (const event of entityType.domainEvents) {
            await this.eventBus.publish(event);
        }
        entityType.clearDomainEvents();
        return entityType;
    }
    async updateEntityType(id, dto, userId, ipAddress) {
        const entityType = await this.entityTypeRepository.findById(new UniqueEntityId_1.UniqueEntityId(id));
        if (!entityType) {
            throw new DomainError_1.DomainError('Entity Type not found.');
        }
        entityType.update(dto.name, dto.description);
        await this.entityTypeRepository.save(entityType);
        for (const event of entityType.domainEvents) {
            await this.eventBus.publish(event);
        }
        entityType.clearDomainEvents();
        return entityType;
    }
    async deleteEntityType(id, userId, ipAddress) {
        const entityType = await this.entityTypeRepository.findById(new UniqueEntityId_1.UniqueEntityId(id));
        if (!entityType) {
            throw new DomainError_1.DomainError('Entity Type not found.');
        }
        entityType.delete();
        await this.entityTypeRepository.save(entityType);
        for (const event of entityType.domainEvents) {
            await this.eventBus.publish(event);
        }
        entityType.clearDomainEvents();
    }
}
exports.EntityTypeService = EntityTypeService;
//# sourceMappingURL=EntityTypeService.js.map