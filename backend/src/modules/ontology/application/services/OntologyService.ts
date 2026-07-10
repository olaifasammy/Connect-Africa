import { IOntologyService } from './IOntologyService';
import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';
import { CreateOntologyDto, UpdateOntologyDto } from '@modules/ontology/application/dto/OntologyDtos';
import { Ontology } from '@modules/ontology/domain/entities/Ontology';
import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';
import { DomainError } from '@modules/ontology/domain/errors/DomainError';
import { UniqueOntologyPolicy } from '@modules/ontology/domain/policies/UniqueOntologyPolicy';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';
import { CacheProvider } from '@shared/infrastructure/cache/CacheProvider';

export class OntologyService implements IOntologyService {
  constructor(
    private readonly ontologyRepository: IOntologyRepository,
    private readonly uniqueOntologyPolicy: UniqueOntologyPolicy,
    private readonly eventBus: EventBus,
    private readonly metricsProvider: IMetricsProvider,
    private readonly cacheProvider: CacheProvider
  ) {}

  async create(dto: CreateOntologyDto, userId?: string, ipAddress?: string): Promise<Ontology> {
    const startTime = Date.now();
    try {
        await this.uniqueOntologyPolicy.validate(dto.name);

        const ontology = Ontology.create({
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
    } catch (error) {
        this.metricsProvider.incrementCounter('ontology_created_total', { status: 'failure' });
        throw error;
    }
  }

  async getById(id: string): Promise<Ontology> {
    const cacheKey = `ontology:${id}`;
    const cached = await this.cacheProvider.get(cacheKey);
    if (cached) {
      const data = JSON.parse(cached);
      return Ontology.create({
        name: data.name,
        description: data.description,
        version: data.version,
        isPublished: data.isPublished,
        isArchived: data.isArchived
      }, OntologyId.create(data.id));
    }
    
    const ontology = await this.ontologyRepository.findById(OntologyId.create(id));
    if (!ontology) {
      throw new DomainError(`Ontology with ID ${id} not found.`);
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

  async update(id: string, dto: UpdateOntologyDto, userId?: string, ipAddress?: string): Promise<Ontology> {
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

  async publish(id: string, userId?: string, ipAddress?: string): Promise<Ontology> {
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

  async archive(id: string, userId?: string, ipAddress?: string): Promise<Ontology> {
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
