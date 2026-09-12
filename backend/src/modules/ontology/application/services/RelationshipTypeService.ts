import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IRelationshipTypeRepository } from '@modules/ontology/domain/repositories/IRelationshipTypeRepository';
import { IEntityTypeRepository } from '@modules/ontology/domain/repositories/IEntityTypeRepository';
import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';

import { RelationshipType } from '@modules/ontology/domain/entities/RelationshipType';
import { RelationshipTypeValidator } from '@modules/ontology/domain/validators/RelationshipTypeValidator';

import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';
import { DomainError } from '@modules/ontology/domain/errors/DomainError';

import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(RelationshipTypeService, true)
@injectable()
export class RelationshipTypeService {
  constructor(
    @inject('IRelationshipTypeRepository')
    private readonly relationshipTypeRepository: IRelationshipTypeRepository,

    @inject('IEntityTypeRepository')
    private readonly entityTypeRepository: IEntityTypeRepository,

    @inject('IOntologyRepository')
    private readonly ontologyRepository: IOntologyRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async createRelationshipType(
    ontologyId: string,
    dto: {
      name: string;
      description: string;
      sourceEntityTypeId: string;
      targetEntityTypeId: string;
    },
    userId?: string,
    ipAddress?: string,
  ): Promise<RelationshipType> {
    const normalizedOntologyId =
      OntologyId.create(ontologyId);

    const ontology =
      await this.ontologyRepository.findById(
        normalizedOntologyId,
      );

    if (!ontology) {
      throw new DomainError(
        'Ontology not found.',
      );
    }

    this.assertOntologyMutable(ontology);

    const sourceEntityType =
      await this.entityTypeRepository.findById(
        new UniqueEntityId(
          dto.sourceEntityTypeId,
        ),
      );

    if (!sourceEntityType) {
      throw new DomainError(
        'Source Entity Type not found.',
      );
    }

    const targetEntityType =
      await this.entityTypeRepository.findById(
        new UniqueEntityId(
          dto.targetEntityTypeId,
        ),
      );

    if (!targetEntityType) {
      throw new DomainError(
        'Target Entity Type not found.',
      );
    }

    if (
      sourceEntityType.ontologyId.toString() !==
      normalizedOntologyId.toString()
    ) {
      throw new DomainError(
        'Source Entity Type does not belong to the specified ontology.',
      );
    }

    if (
      targetEntityType.ontologyId.toString() !==
      normalizedOntologyId.toString()
    ) {
      throw new DomainError(
        'Target Entity Type does not belong to the specified ontology.',
      );
    }

    const relationshipType =
      RelationshipType.create({
        ontologyId: normalizedOntologyId,
        name: dto.name,
        description: dto.description,
        sourceEntityTypeId:
          new UniqueEntityId(
            dto.sourceEntityTypeId,
          ),
        targetEntityTypeId:
          new UniqueEntityId(
            dto.targetEntityTypeId,
          ),
      });

    RelationshipTypeValidator.validate({
      name: relationshipType.name,
      description: relationshipType.description,
    });

    await this.relationshipTypeRepository.save(
      relationshipType,
    );

    await this.publishDomainEvents(
      relationshipType,
    );

    return relationshipType;
  }

  async updateRelationshipType(
    id: string,
    dto: {
      name: string;
      description: string;
    },
    userId?: string,
    ipAddress?: string,
  ): Promise<RelationshipType> {
    const relationshipType =
      await this.relationshipTypeRepository.findById(
        new UniqueEntityId(id),
      );

    if (!relationshipType) {
      throw new DomainError(
        'Relationship Type not found.',
      );
    }

    const ontology =
      await this.ontologyRepository.findById(
        relationshipType.ontologyId,
      );

    if (!ontology) {
      throw new DomainError(
        'Ontology not found.',
      );
    }

    this.assertOntologyMutable(ontology);

    relationshipType.update(
      dto.name,
      dto.description,
    );

    RelationshipTypeValidator.validate({
      name: relationshipType.name,
      description: relationshipType.description,
    });

    await this.relationshipTypeRepository.save(
      relationshipType,
    );

    await this.publishDomainEvents(
      relationshipType,
    );

    return relationshipType;
  }

  async deleteRelationshipType(
    id: string,
    userId?: string,
    ipAddress?: string,
  ): Promise<void> {
    const relationshipType =
      await this.relationshipTypeRepository.findById(
        new UniqueEntityId(id),
      );

    if (!relationshipType) {
      throw new DomainError(
        'Relationship Type not found.',
      );
    }

    const ontology =
      await this.ontologyRepository.findById(
        relationshipType.ontologyId,
      );

    if (!ontology) {
      throw new DomainError(
        'Ontology not found.',
      );
    }

    this.assertOntologyMutable(ontology);

    relationshipType.delete();

    await this.relationshipTypeRepository.delete(
      relationshipType.id,
    );

    await this.publishDomainEvents(
      relationshipType,
    );
  }

  private assertOntologyMutable(
    ontology: {
      isPublished: boolean;
      isArchived: boolean;
    },
  ): void {
    if (ontology.isArchived) {
      throw new DomainError(
        'Archived ontologies cannot modify Relationship Types.',
      );
    }

    if (ontology.isPublished) {
      throw new DomainError(
        'Published ontologies cannot structurally modify Relationship Types.',
      );
    }
  }

  private async publishDomainEvents(
    relationshipType: RelationshipType,
  ): Promise<void> {
    for (const event of relationshipType.domainEvents) {
      await this.eventBus.publish(event);
    }

    relationshipType.clearDomainEvents();
  }
}