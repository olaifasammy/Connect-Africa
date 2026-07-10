import { IEntityTypeRepository } from '@modules/ontology/domain/repositories/IEntityTypeRepository';
import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';
import { EntityType } from '@modules/ontology/domain/entities/EntityType';
import { EntityTypeValidator } from '@modules/ontology/domain/validators/EntityTypeValidator';
import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';
import { DomainError } from '@modules/ontology/domain/errors/DomainError';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class EntityTypeService {
  constructor(
    private readonly entityTypeRepository: IEntityTypeRepository,
    private readonly ontologyRepository: IOntologyRepository,
    private readonly entityTypeValidator: EntityTypeValidator,
    private readonly eventBus: EventBus
  ) {}

  async createEntityType(
    ontologyId: string,
    dto: { name: string; description: string },
    userId?: string,
    ipAddress?: string
  ): Promise<EntityType> {
    const ontology = await this.ontologyRepository.findById(OntologyId.create(ontologyId));
    if (!ontology) {
      throw new DomainError('Ontology not found.');
    }

    const entityType = EntityType.create({
      ontologyId: OntologyId.create(ontologyId),
      name: dto.name,
      description: dto.description
    });

    EntityTypeValidator.validate({ name: entityType.name, description: entityType.description });

    await this.entityTypeRepository.save(entityType);

    for (const event of entityType.domainEvents) {
      await this.eventBus.publish(event);
    }
    entityType.clearDomainEvents();

    return entityType;
  }

  async updateEntityType(
    id: string,
    dto: { name: string; description: string },
    userId?: string,
    ipAddress?: string
  ): Promise<EntityType> {
    const entityType = await this.entityTypeRepository.findById(new UniqueEntityId(id));
    if (!entityType) {
        throw new DomainError('Entity Type not found.');
    }

    entityType.update(dto.name, dto.description);

    await this.entityTypeRepository.save(entityType);

    for (const event of entityType.domainEvents) {
      await this.eventBus.publish(event);
    }
    entityType.clearDomainEvents();

    return entityType;
  }

  async deleteEntityType(
    id: string,
    userId?: string,
    ipAddress?: string
  ): Promise<void> {
    const entityType = await this.entityTypeRepository.findById(new UniqueEntityId(id));
    if (!entityType) {
        throw new DomainError('Entity Type not found.');
    }

    entityType.delete();

    await this.entityTypeRepository.save(entityType); 

    for (const event of entityType.domainEvents) {
      await this.eventBus.publish(event);
    }
    entityType.clearDomainEvents();
  }
}
