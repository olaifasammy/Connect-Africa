import { IOntologyService } from './IOntologyService';
import { IOntologyRepository } from '../../../ontology/domain/repositories/IOntologyRepository';
import { CreateOntologyDto, UpdateOntologyDto } from '../../../ontology/application/dto/OntologyDtos';
import { Ontology } from '../../../ontology/domain/entities/Ontology';
import { UniqueOntologyPolicy } from '../../../ontology/domain/policies/UniqueOntologyPolicy';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
import { IMetricsProvider } from '../../../../shared/monitoring/IMetricsProvider';
import { CacheProvider } from '../../../../shared/infrastructure/cache/CacheProvider';
export declare class OntologyService implements IOntologyService {
    private readonly ontologyRepository;
    private readonly uniqueOntologyPolicy;
    private readonly eventBus;
    private readonly metricsProvider;
    private readonly cacheProvider;
    constructor(ontologyRepository: IOntologyRepository, uniqueOntologyPolicy: UniqueOntologyPolicy, eventBus: EventBus, metricsProvider: IMetricsProvider, cacheProvider: CacheProvider);
    create(dto: CreateOntologyDto, userId?: string, ipAddress?: string): Promise<Ontology>;
    getById(id: string): Promise<Ontology>;
    update(id: string, dto: UpdateOntologyDto, userId?: string, ipAddress?: string): Promise<Ontology>;
    publish(id: string, userId?: string, ipAddress?: string): Promise<Ontology>;
    archive(id: string, userId?: string, ipAddress?: string): Promise<Ontology>;
}
