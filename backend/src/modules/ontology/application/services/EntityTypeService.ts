import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IEntityTypeRepository } from '@modules/ontology/domain/repositories/IEntityTypeRepository';
import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';

import { EntityType } from '@modules/ontology/domain/entities/EntityType';
import { EntityTypeValidator } from '@modules/ontology/domain/validators/EntityTypeValidator';

import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';
import { DomainError } from '@modules/ontology/domain/errors/DomainError';

import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(EntityTypeService, true)
@injectable()
export class EntityTypeService {
  constructor(
    @inject('IEntityTypeRepository')
    private readonly entityTypeRepository: IEntityTypeRepository,

    @inject('IOntologyRepository')
    private readonly ontologyRepository: IOntologyRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async createEntityType(
    ontologyId: string,
    dto: {
      name: string;
      description: string;
    },
    userId?: string,
    ipAddress?: string,
  ): Promise<EntityType> {
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

    const entityType =
      EntityType.create({
        ontologyId: normalizedOntologyId,
        name: dto.name,
        description: dto.description,
      });

    EntityTypeValidator.validate({
      name: entityType.name,
      description: entityType.description,
    });

    await this.entityTypeRepository.save(
      entityType,
    );

    for (const event of entityType.domainEvents) {
      await this.eventBus.publish(event);
    }

    entityType.clearDomainEvents();

    return entityType;
  }

  async updateEntityType(
    id: string,
    dto: {
      name: string;
      description: string;
    },
    userId?: string,
    ipAddress?: string,
  ): Promise<EntityType> {
    const entityType =
      await this.entityTypeRepository.findById(
        new UniqueEntityId(id),
      );

    if (!entityType) {
      throw new DomainError(
        'Entity Type not found.',
      );
    }

    const ontology =
      await this.ontologyRepository.findById(
        entityType.ontologyId,
      );

    if (!ontology) {
      throw new DomainError(
        'Ontology not found.',
      );
    }

    this.assertOntologyMutable(ontology);

    entityType.update(
      dto.name,
      dto.description,
    );

    EntityTypeValidator.validate({
      name: entityType.name,
      description: entityType.description,
    });

    await this.entityTypeRepository.save(
      entityType,
    );

    for (const event of entityType.domainEvents) {
      await this.eventBus.publish(event);
    }

    entityType.clearDomainEvents();

    return entityType;
  }

  async deleteEntityType(
    id: string,
    userId?: string,
    ipAddress?: string,
  ): Promise<void> {
    const entityType =
      await this.entityTypeRepository.findById(
        new UniqueEntityId(id),
      );

    if (!entityType) {
      throw new DomainError(
        'Entity Type not found.',
      );
    }

    const ontology =
      await this.ontologyRepository.findById(
        entityType.ontologyId,
      );

    if (!ontology) {
      throw new DomainError(
        'Ontology not found.',
      );
    }

    this.assertOntologyMutable(ontology);

    entityType.delete();

    /*
     * The database owns referential integrity here.
     * If relationships or entities still reference this
     * Entity Type, PostgreSQL must reject the deletion rather
     * than allowing the application to report a false success.
     */
    await this.entityTypeRepository.delete(
      entityType.id,
    );

    for (const event of entityType.domainEvents) {
      await this.eventBus.publish(event);
    }

    entityType.clearDomainEvents();
  }

  private assertOntologyMutable(
    ontology: {
      isPublished: boolean;
      isArchived: boolean;
    },
  ): void {
    if (ontology.isArchived) {
      throw new DomainError(
        'Archived ontologies cannot modify Entity Types.',
      );
    }

    if (ontology.isPublished) {
      throw new DomainError(
        'Published ontologies cannot structurally modify Entity Types.',
      );
    }
  }
}
