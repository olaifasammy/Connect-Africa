"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyService = void 0;
const Ontology_1 = require("../../../ontology/domain/entities/Ontology");
const OntologyId_1 = require("../../../ontology/domain/value-objects/OntologyId");
const DomainError_1 = require("../../../ontology/domain/errors/DomainError");
class OntologyService {
    ontologyRepository;
    uniqueOntologyPolicy;
    eventBus;
    metricsProvider;
    cacheProvider;
    constructor(ontologyRepository, uniqueOntologyPolicy, eventBus, metricsProvider, cacheProvider) {
        this.ontologyRepository = ontologyRepository;
        this.uniqueOntologyPolicy = uniqueOntologyPolicy;
        this.eventBus = eventBus;
        this.metricsProvider = metricsProvider;
        this.cacheProvider = cacheProvider;
    }
    async create(dto, userId, ipAddress) {
        const startTime = Date.now();
        try {
            await this.uniqueOntologyPolicy.validate(dto.name);
            const ontology = Ontology_1.Ontology.create({
                name: dto.name,
                description: dto.description,
                version: 1,
                isPublished: false,
                isArchived: false
            });
            await this.ontologyRepository.save(ontology);
            for (const event of ontology.domainEvents) {
                await this.eventBus.publish(event);
            }
            ontology.clearDomainEvents();
            this.metricsProvider.incrementCounter('ontology_created_total', { status: 'success' });
            this.metricsProvider.observeDuration('ontology_creation_duration_seconds', (Date.now() - startTime) / 1000, { status: 'success' });
            return ontology;
        }
        catch (error) {
            this.metricsProvider.incrementCounter('ontology_created_total', { status: 'failure' });
            throw error;
        }
    }
    async getById(id) {
        const cacheKey = `ontology:${id}`;
        const cached = await this.cacheProvider.get(cacheKey);
        if (cached) {
            const data = JSON.parse(cached);
            return Ontology_1.Ontology.create({
                name: data.name,
                description: data.description,
                version: data.version,
                isPublished: data.isPublished,
                isArchived: data.isArchived
            }, OntologyId_1.OntologyId.create(data.id));
        }
        const ontology = await this.ontologyRepository.findById(OntologyId_1.OntologyId.create(id));
        if (!ontology) {
            throw new DomainError_1.DomainError(`Ontology with ID ${id} not found.`);
        }
        await this.cacheProvider.set(cacheKey, JSON.stringify({
            id: ontology.id.toString(),
            name: ontology.name,
            description: ontology.description,
            version: ontology.version,
            isPublished: ontology.isPublished,
            isArchived: ontology.isArchived
        }), 3600);
        return ontology;
    }
    async update(id, dto, userId, ipAddress) {
        const ontology = await this.getById(id);
        ontology.update(dto.name || ontology.name, dto.description || ontology.description);
        await this.ontologyRepository.save(ontology);
        for (const event of ontology.domainEvents) {
            await this.eventBus.publish(event);
        }
        ontology.clearDomainEvents();
        this.metricsProvider.incrementCounter('ontology_updated_total', { status: 'success' });
        return ontology;
    }
    async publish(id, userId, ipAddress) {
        const ontology = await this.getById(id);
        ontology.publish();
        await this.ontologyRepository.save(ontology);
        for (const event of ontology.domainEvents) {
            await this.eventBus.publish(event);
        }
        ontology.clearDomainEvents();
        this.metricsProvider.incrementCounter('ontology_published_total', { status: 'success' });
        return ontology;
    }
    async archive(id, userId, ipAddress) {
        const ontology = await this.getById(id);
        ontology.archive();
        await this.ontologyRepository.save(ontology);
        for (const event of ontology.domainEvents) {
            await this.eventBus.publish(event);
        }
        ontology.clearDomainEvents();
        this.metricsProvider.incrementCounter('ontology_archived_total', { status: 'success' });
        return ontology;
    }
}
exports.OntologyService = OntologyService;
//# sourceMappingURL=OntologyService.js.map