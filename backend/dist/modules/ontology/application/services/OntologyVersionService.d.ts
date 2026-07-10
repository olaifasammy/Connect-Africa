import { IOntologyVersionRepository } from '../../../ontology/domain/repositories/IOntologyVersionRepository';
import { IOntologyRepository } from '../../../ontology/domain/repositories/IOntologyRepository';
import { OntologyVersion } from '../../../ontology/domain/entities/OntologyVersion';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class OntologyVersionService {
    private readonly ontologyVersionRepository;
    private readonly ontologyRepository;
    private readonly eventBus;
    constructor(ontologyVersionRepository: IOntologyVersionRepository, ontologyRepository: IOntologyRepository, eventBus: EventBus);
    createVersion(ontologyId: string, versionNumber: number): Promise<OntologyVersion>;
    publishVersion(id: string): Promise<void>;
    rollbackVersion(id: string): Promise<void>;
}
