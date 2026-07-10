import { IOntologyVersionRepository } from '@modules/ontology/domain/repositories/IOntologyVersionRepository';
import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';
import { OntologyVersion } from '@modules/ontology/domain/entities/OntologyVersion';
import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';
import { DomainError } from '@modules/ontology/domain/errors/DomainError';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { OntologyVersionCreatedEvent } from '@modules/ontology/domain/events/OntologyVersionCreatedEvent';
import { OntologyVersionPublishedEvent } from '@modules/ontology/domain/events/OntologyVersionPublishedEvent';
import { OntologyVersionRollbackEvent } from '@modules/ontology/domain/events/OntologyVersionRollbackEvent';

export class OntologyVersionService {
  constructor(
    private readonly ontologyVersionRepository: IOntologyVersionRepository,
    private readonly ontologyRepository: IOntologyRepository,
    private readonly eventBus: EventBus
  ) {}

  async createVersion(
    ontologyId: string,
    versionNumber: number
  ): Promise<OntologyVersion> {
    const ontology = await this.ontologyRepository.findById(OntologyId.create(ontologyId));
    if (!ontology) {
        throw new DomainError('Ontology not found.');
    }

    const version = OntologyVersion.create({
      version: versionNumber,
      isPublished: false,
      createdAt: new Date(),
    });

    await this.ontologyVersionRepository.save(version);
    
    await this.eventBus.publish(new OntologyVersionCreatedEvent(new UniqueEntityId(version.id.toString())));
    
    return version;
  }

  async publishVersion(id: string): Promise<void> {
    const version = await this.ontologyVersionRepository.findById(new UniqueEntityId(id));
    if (!version) {
        throw new DomainError('Ontology Version not found.');
    }
    version.publish();
    await this.ontologyVersionRepository.save(version);
    
    await this.eventBus.publish(new OntologyVersionPublishedEvent(new UniqueEntityId(version.id.toString())));
  }

  async rollbackVersion(id: string): Promise<void> {
    const version = await this.ontologyVersionRepository.findById(new UniqueEntityId(id));
    if (!version) {
        throw new DomainError('Ontology Version not found.');
    }
    if (!version.isPublished) {
        throw new DomainError('Ontology Version is not published, cannot rollback.');
    }
    
    await this.ontologyVersionRepository.save(version);
    
    await this.eventBus.publish(new OntologyVersionRollbackEvent(new UniqueEntityId(version.id.toString())));
  }
}
