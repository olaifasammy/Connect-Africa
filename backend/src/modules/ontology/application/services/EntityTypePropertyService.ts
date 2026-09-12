import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IEntityTypePropertyRepository } from '@modules/ontology/domain/repositories/IEntityTypePropertyRepository';
import { IEntityTypeRepository } from '@modules/ontology/domain/repositories/IEntityTypeRepository';
import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';

import { EntityTypeProperty } from '@modules/ontology/domain/entities/EntityTypeProperty';
import { PropertyDefinition } from '@modules/ontology/domain/value-objects/PropertyDefinition';
import { CardinalityRule } from '@modules/ontology/domain/value-objects/CardinalityRule';
import { PropertyDefinitionValidator } from '@modules/ontology/domain/validators/PropertyDefinitionValidator';

import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { DomainError } from '@modules/ontology/domain/errors/DomainError';

import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';

@provide(EntityTypePropertyService, true)
@injectable()
export class EntityTypePropertyService {
  constructor(
    @inject('IEntityTypePropertyRepository')
    private readonly propertyRepository: IEntityTypePropertyRepository,

    @inject('IEntityTypeRepository')
    private readonly entityTypeRepository: IEntityTypeRepository,

    @inject('IOntologyRepository')
    private readonly ontologyRepository: IOntologyRepository,
  ) {}

  async createProperty(
    entityTypeId: string,
    dto: {
      name: string;
      dataType: string;
      minCardinality?: number;
      maxCardinality?: number | null;
      required?: boolean;
    },
  ): Promise<EntityTypeProperty> {
    const normalizedEntityTypeId =
      new UniqueEntityId(entityTypeId);

    const entityType =
      await this.entityTypeRepository.findById(
        normalizedEntityTypeId,
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

    PropertyDefinitionValidator.validate({
      name: dto.name,
      dataType: dto.dataType,
    });

    const existing =
      await this.propertyRepository.findByName(
        normalizedEntityTypeId,
        dto.name,
      );

    if (existing) {
      throw new DomainError(
        `Entity Type Property already exists: ${dto.name.trim()}.`,
      );
    }

    const minCardinality =
      dto.minCardinality ?? 0;

    const maxCardinality =
      dto.maxCardinality ?? null;

    const required =
      dto.required ?? false;

    const cardinality =
      CardinalityRule.create({
        min: minCardinality,
        max: maxCardinality,
      });

    if (required && cardinality.min < 1) {
      throw new DomainError(
        'A required property must have a minimum cardinality of at least 1.',
      );
    }

    const now = new Date();

    const property =
      EntityTypeProperty.create({
        entityTypeId:
          normalizedEntityTypeId,
        ontologyId:
          OntologyId.create(
            entityType.ontologyId.toString(),
          ),
        name: dto.name,
        definition:
          PropertyDefinition.create(
            dto.dataType,
          ),
        cardinality,
        required,
        createdAt: now,
        updatedAt: now,
      });

    await this.propertyRepository.save(
      property,
    );

    return property;
  }

  async updateProperty(
    id: string,
    dto: {
      name: string;
      dataType: string;
      minCardinality?: number;
      maxCardinality?: number | null;
      required?: boolean;
    },
  ): Promise<EntityTypeProperty> {
    const property =
      await this.propertyRepository.findById(
        new UniqueEntityId(id),
      );

    if (!property) {
      throw new DomainError(
        'Entity Type Property not found.',
      );
    }

    const ontology =
      await this.ontologyRepository.findById(
        property.ontologyId,
      );

    if (!ontology) {
      throw new DomainError(
        'Ontology not found.',
      );
    }

    this.assertOntologyMutable(ontology);

    PropertyDefinitionValidator.validate({
      name: dto.name,
      dataType: dto.dataType,
    });

    const existing =
      await this.propertyRepository.findByName(
        property.entityTypeId,
        dto.name,
      );

    if (
      existing &&
      existing.id.toString() !==
        property.id.toString()
    ) {
      throw new DomainError(
        `Entity Type Property already exists: ${dto.name.trim()}.`,
      );
    }

    const minCardinality =
      dto.minCardinality ??
      property.cardinality.min;

    const maxCardinality =
      dto.maxCardinality !== undefined
        ? dto.maxCardinality
        : property.cardinality.max;

    const required =
      dto.required ??
      property.required;

    const cardinality =
      CardinalityRule.create({
        min: minCardinality,
        max: maxCardinality,
      });

    if (required && cardinality.min < 1) {
      throw new DomainError(
        'A required property must have a minimum cardinality of at least 1.',
      );
    }

    property.update(
      dto.name,
      PropertyDefinition.create(
        dto.dataType,
      ),
      cardinality,
      required,
    );

    await this.propertyRepository.save(
      property,
    );

    return property;
  }

  async deleteProperty(
    id: string,
  ): Promise<void> {
    const property =
      await this.propertyRepository.findById(
        new UniqueEntityId(id),
      );

    if (!property) {
      throw new DomainError(
        'Entity Type Property not found.',
      );
    }

    const ontology =
      await this.ontologyRepository.findById(
        property.ontologyId,
      );

    if (!ontology) {
      throw new DomainError(
        'Ontology not found.',
      );
    }

    this.assertOntologyMutable(ontology);

    await this.propertyRepository.delete(
      property.id,
    );
  }

  async listProperties(
    entityTypeId: string,
  ): Promise<EntityTypeProperty[]> {
    const normalizedEntityTypeId =
      new UniqueEntityId(entityTypeId);

    const entityType =
      await this.entityTypeRepository.findById(
        normalizedEntityTypeId,
      );

    if (!entityType) {
      throw new DomainError(
        'Entity Type not found.',
      );
    }

    return this.propertyRepository.findByEntityTypeId(
      normalizedEntityTypeId,
    );
  }

  async getProperty(
    id: string,
  ): Promise<EntityTypeProperty> {
    const property =
      await this.propertyRepository.findById(
        new UniqueEntityId(id),
      );

    if (!property) {
      throw new DomainError(
        'Entity Type Property not found.',
      );
    }

    return property;
  }

  private assertOntologyMutable(
    ontology: {
      isPublished: boolean;
      isArchived: boolean;
    },
  ): void {
    if (ontology.isArchived) {
      throw new DomainError(
        'Archived ontologies cannot modify Entity Type Properties.',
      );
    }

    if (ontology.isPublished) {
      throw new DomainError(
        'Published ontologies cannot structurally modify Entity Type Properties.',
      );
    }
  }
}