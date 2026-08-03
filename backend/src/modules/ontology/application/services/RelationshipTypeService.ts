import { IRelationshipTypeRepository } from '@modules/ontology/domain/repositories/IRelationshipTypeRepository';
import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';
import { RelationshipType } from '@modules/ontology/domain/entities/RelationshipType';
import { RelationshipTypeValidator } from '@modules/ontology/domain/validators/RelationshipTypeValidator';
import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';
import { DomainError } from '@modules/ontology/domain/errors/DomainError';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RelationshipTypeService {
  constructor(
    private readonly relationshipTypeRepository: IRelationshipTypeRepository,
    private readonly ontologyRepository: IOntologyRepository,
    private readonly relationshipTypeValidator: RelationshipTypeValidator,
    private readonly eventBus: EventBus
  ) {}

  async createRelationshipType(
    ontologyId: string,
    dto: { name: string; description: string; sourceEntityTypeId: string; targetEntityTypeId: string },
    userId?: string,
    ipAddress?: string
  ): Promise<RelationshipType> {
    const ontology = await this.ontologyRepository.findById(OntologyId.create(ontologyId));
    if (!ontology) {
      throw new DomainError('Ontology not found.');
    }

    const relationshipType = RelationshipType.create({
      ontologyId: OntologyId.create(ontologyId),
      name: dto.name,
      description: dto.description,
      sourceEntityTypeId: new UniqueEntityId(dto.sourceEntityTypeId),
      targetEntityTypeId: new UniqueEntityId(dto.targetEntityTypeId)
    });

    RelationshipTypeValidator.validate({ name: relationshipType.name, description: relationshipType.description });

    await this.relationshipTypeRepository.save(relationshipType);

    for (const event of relationshipType.domainEvents) {
      await this.eventBus.publish(event);
    }
    relationshipType.clearDomainEvents();

    return relationshipType;
  }

  async updateRelationshipType(
    id: string,
    dto: { name: string; description: string },
    userId?: string,
    ipAddress?: string
  ): Promise<RelationshipType> {
    const relationshipType = await this.relationshipTypeRepository.findById(new UniqueEntityId(id));
    if (!relationshipType) {
        throw new DomainError('Relationship Type not found.');
    }

    relationshipType.update(dto.name, dto.description);

    await this.relationshipTypeRepository.save(relationshipType);

    for (const event of relationshipType.domainEvents) {
      await this.eventBus.publish(event);
    }
    relationshipType.clearDomainEvents();

    return relationshipType;
  }

  async deleteRelationshipType(
    id: string,
    userId?: string,
    ipAddress?: string
  ): Promise<void> {
    const relationshipType = await this.relationshipTypeRepository.findById(new UniqueEntityId(id));
    if (!relationshipType) {
        throw new DomainError('Relationship Type not found.');
    }

    relationshipType.delete();

    await this.relationshipTypeRepository.save(relationshipType);

    for (const event of relationshipType.domainEvents) {
      await this.eventBus.publish(event);
    }
    relationshipType.clearDomainEvents();
  }
}
