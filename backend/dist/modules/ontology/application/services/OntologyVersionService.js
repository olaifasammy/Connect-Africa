"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyVersionService = void 0;
const OntologyVersion_1 = require("../../../ontology/domain/entities/OntologyVersion");
const OntologyId_1 = require("../../../ontology/domain/value-objects/OntologyId");
const DomainError_1 = require("../../../ontology/domain/errors/DomainError");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const OntologyVersionCreatedEvent_1 = require("../../../ontology/domain/events/OntologyVersionCreatedEvent");
const OntologyVersionPublishedEvent_1 = require("../../../ontology/domain/events/OntologyVersionPublishedEvent");
const OntologyVersionRollbackEvent_1 = require("../../../ontology/domain/events/OntologyVersionRollbackEvent");
class OntologyVersionService {
    ontologyVersionRepository;
    ontologyRepository;
    eventBus;
    constructor(ontologyVersionRepository, ontologyRepository, eventBus) {
        this.ontologyVersionRepository = ontologyVersionRepository;
        this.ontologyRepository = ontologyRepository;
        this.eventBus = eventBus;
    }
    async createVersion(ontologyId, versionNumber) {
        const ontology = await this.ontologyRepository.findById(OntologyId_1.OntologyId.create(ontologyId));
        if (!ontology) {
            throw new DomainError_1.DomainError('Ontology not found.');
        }
        const version = OntologyVersion_1.OntologyVersion.create({
            version: versionNumber,
            isPublished: false,
            createdAt: new Date(),
        });
        await this.ontologyVersionRepository.save(version);
        await this.eventBus.publish(new OntologyVersionCreatedEvent_1.OntologyVersionCreatedEvent(new UniqueEntityId_1.UniqueEntityId(version.id.toString())));
        return version;
    }
    async publishVersion(id) {
        const version = await this.ontologyVersionRepository.findById(new UniqueEntityId_1.UniqueEntityId(id));
        if (!version) {
            throw new DomainError_1.DomainError('Ontology Version not found.');
        }
        version.publish();
        await this.ontologyVersionRepository.save(version);
        await this.eventBus.publish(new OntologyVersionPublishedEvent_1.OntologyVersionPublishedEvent(new UniqueEntityId_1.UniqueEntityId(version.id.toString())));
    }
    async rollbackVersion(id) {
        const version = await this.ontologyVersionRepository.findById(new UniqueEntityId_1.UniqueEntityId(id));
        if (!version) {
            throw new DomainError_1.DomainError('Ontology Version not found.');
        }
        if (!version.isPublished) {
            throw new DomainError_1.DomainError('Ontology Version is not published, cannot rollback.');
        }
        await this.ontologyVersionRepository.save(version);
        await this.eventBus.publish(new OntologyVersionRollbackEvent_1.OntologyVersionRollbackEvent(new UniqueEntityId_1.UniqueEntityId(version.id.toString())));
    }
}
exports.OntologyVersionService = OntologyVersionService;
//# sourceMappingURL=OntologyVersionService.js.map