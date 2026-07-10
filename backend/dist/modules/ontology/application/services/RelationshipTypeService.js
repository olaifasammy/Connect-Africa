"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipTypeService = void 0;
const RelationshipType_1 = require("../../../ontology/domain/entities/RelationshipType");
const RelationshipTypeValidator_1 = require("../../../ontology/domain/validators/RelationshipTypeValidator");
const OntologyId_1 = require("../../../ontology/domain/value-objects/OntologyId");
const DomainError_1 = require("../../../ontology/domain/errors/DomainError");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class RelationshipTypeService {
    relationshipTypeRepository;
    ontologyRepository;
    relationshipTypeValidator;
    eventBus;
    constructor(relationshipTypeRepository, ontologyRepository, relationshipTypeValidator, eventBus) {
        this.relationshipTypeRepository = relationshipTypeRepository;
        this.ontologyRepository = ontologyRepository;
        this.relationshipTypeValidator = relationshipTypeValidator;
        this.eventBus = eventBus;
    }
    async createRelationshipType(ontologyId, dto, userId, ipAddress) {
        const ontology = await this.ontologyRepository.findById(OntologyId_1.OntologyId.create(ontologyId));
        if (!ontology) {
            throw new DomainError_1.DomainError('Ontology not found.');
        }
        const relationshipType = RelationshipType_1.RelationshipType.create({
            ontologyId: OntologyId_1.OntologyId.create(ontologyId),
            name: dto.name,
            description: dto.description,
            sourceEntityTypeId: new UniqueEntityId_1.UniqueEntityId(dto.sourceEntityTypeId),
            targetEntityTypeId: new UniqueEntityId_1.UniqueEntityId(dto.targetEntityTypeId)
        });
        RelationshipTypeValidator_1.RelationshipTypeValidator.validate({ name: relationshipType.name, description: relationshipType.description });
        await this.relationshipTypeRepository.save(relationshipType);
        for (const event of relationshipType.domainEvents) {
            await this.eventBus.publish(event);
        }
        relationshipType.clearDomainEvents();
        return relationshipType;
    }
    async updateRelationshipType(id, dto, userId, ipAddress) {
        const relationshipType = await this.relationshipTypeRepository.findById(new UniqueEntityId_1.UniqueEntityId(id));
        if (!relationshipType) {
            throw new DomainError_1.DomainError('Relationship Type not found.');
        }
        relationshipType.update(dto.name, dto.description);
        await this.relationshipTypeRepository.save(relationshipType);
        for (const event of relationshipType.domainEvents) {
            await this.eventBus.publish(event);
        }
        relationshipType.clearDomainEvents();
        return relationshipType;
    }
    async deleteRelationshipType(id, userId, ipAddress) {
        const relationshipType = await this.relationshipTypeRepository.findById(new UniqueEntityId_1.UniqueEntityId(id));
        if (!relationshipType) {
            throw new DomainError_1.DomainError('Relationship Type not found.');
        }
        relationshipType.delete();
        await this.relationshipTypeRepository.save(relationshipType);
        for (const event of relationshipType.domainEvents) {
            await this.eventBus.publish(event);
        }
        relationshipType.clearDomainEvents();
    }
}
exports.RelationshipTypeService = RelationshipTypeService;
//# sourceMappingURL=RelationshipTypeService.js.map