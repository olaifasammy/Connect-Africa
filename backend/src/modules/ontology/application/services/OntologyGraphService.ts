import {
  injectable,
  inject,
} from 'inversify';

import { provide } from 'inversify-binding-decorators';

import { IOntologyGraphService } from './IOntologyGraphService';

import { IEntityTypeRepository } from '@modules/ontology/domain/repositories/IEntityTypeRepository';

import { IRelationshipTypeRepository } from '@modules/ontology/domain/repositories/IRelationshipTypeRepository';

import { IEntityTypePropertyRepository } from '@modules/ontology/domain/repositories/IEntityTypePropertyRepository';

import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import { PropertyDataType } from '@modules/ontology/domain/value-objects/PropertyDefinition';

@provide(
  'IOntologyGraphService',
  true,
)
@injectable()
export class OntologyGraphService
  implements IOntologyGraphService
{
  constructor(
    @inject('IEntityTypeRepository')
    private readonly entityTypeRepository:
      IEntityTypeRepository,

    @inject('IRelationshipTypeRepository')
    private readonly relationshipTypeRepository:
      IRelationshipTypeRepository,

    @inject('IEntityTypePropertyRepository')
    private readonly propertyRepository:
      IEntityTypePropertyRepository,
  ) {}

  async validateEntityType(
    entityTypeId: string,
  ): Promise<boolean> {
    const entityType =
      await this.entityTypeRepository.findById(
        new UniqueEntityId(entityTypeId),
      );

    return !!entityType;
  }

  async validateRelationshipType(
    relationshipTypeId: string,
    sourceEntityTypeId: string,
    targetEntityTypeId: string,
  ): Promise<boolean> {
    const relType =
      await this.relationshipTypeRepository.findById(
        new UniqueEntityId(
          relationshipTypeId,
        ),
      );

    if (!relType) {
      return false;
    }

    return (
      relType.sourceEntityTypeId.equals(
        new UniqueEntityId(
          sourceEntityTypeId,
        ),
      ) &&
      relType.targetEntityTypeId.equals(
        new UniqueEntityId(
          targetEntityTypeId,
        ),
      )
    );
  }

  async validateCardinality(
    relationshipTypeId: string,
    sourceEntityTypeId: string,
  ): Promise<boolean> {
    const relType =
      await this.relationshipTypeRepository.findById(
        new UniqueEntityId(
          relationshipTypeId,
        ),
      );

    if (!relType) {
      return false;
    }

    /*
     * Relationship cardinality is not yet represented
     * by RelationshipType. Do not fabricate validation
     * semantics here.
     */
    return true;
  }

  async validateMetadataSchema(
    entityTypeId: string,
    metadata: Record<string, any>,
  ): Promise<boolean> {
    const entityType =
      await this.entityTypeRepository.findById(
        new UniqueEntityId(entityTypeId),
      );

    if (!entityType) {
      return false;
    }

    if (
      metadata === null ||
      typeof metadata !== 'object' ||
      Array.isArray(metadata)
    ) {
      return false;
    }

    const properties =
      await this.propertyRepository.findByEntityTypeId(
        new UniqueEntityId(entityTypeId),
      );

    const propertyNames =
      new Set(
        properties.map(
          (property) => property.name,
        ),
      );

    /*
     * Ontology metadata is strict:
     * every supplied dynamic attribute must have
     * an explicitly defined EntityTypeProperty.
     */
    for (const key of Object.keys(
      metadata,
    )) {
      if (!propertyNames.has(key)) {
        return false;
      }
    }

    for (const property of properties) {
      const hasValue =
        Object.prototype.hasOwnProperty.call(
          metadata,
          property.name,
        );

      const value =
        hasValue
          ? metadata[property.name]
          : undefined;

      const values =
        this.normalizeValues(
          value,
          property.definition.dataType,
        );

      if (
        values.length <
        property.cardinality.min
      ) {
        return false;
      }

      if (
        property.cardinality.max !==
          null &&
        values.length >
          property.cardinality.max
      ) {
        return false;
      }

      if (
        property.required &&
        values.length < 1
      ) {
        return false;
      }

      for (const item of values) {
        if (
          !this.isValueCompatible(
            item,
            property.definition.dataType,
          )
        ) {
          return false;
        }
      }
    }

    return true;
  }

  private normalizeValues(
    value: unknown,
    dataType: PropertyDataType,
  ): unknown[] {
    if (value === undefined) {
      return [];
    }

    /*
     * JSON is itself allowed to contain arrays/objects.
     * Therefore an array assigned to a JSON property is
     * one JSON value, not a multi-valued property.
     */
    if (
      dataType === 'JSON'
    ) {
      return [value];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  }

  private isValueCompatible(
    value: unknown,
    dataType: PropertyDataType,
  ): boolean {
    switch (dataType) {
      case 'STRING':
      case 'TEXT':
        return (
          typeof value === 'string'
        );

      case 'INTEGER':
        return (
          typeof value === 'number' &&
          Number.isInteger(value) &&
          Number.isFinite(value)
        );

      case 'NUMBER':
        return (
          typeof value === 'number' &&
          Number.isFinite(value)
        );

      case 'BOOLEAN':
        return (
          typeof value === 'boolean'
        );

      case 'DATE':
        return (
          typeof value === 'string' &&
          this.isValidDate(value)
        );

      case 'DATETIME':
        return (
          typeof value === 'string' &&
          this.isValidDateTime(value)
        );

      case 'JSON':
        return this.isJsonValue(value);

      default:
        return false;
    }
  }

  private isValidDate(
    value: string,
  ): boolean {
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(
        value,
      )
    ) {
      return false;
    }

    const parsed =
      new Date(
        `${value}T00:00:00.000Z`,
      );

    if (
      Number.isNaN(
        parsed.getTime(),
      )
    ) {
      return false;
    }

    return (
      parsed.toISOString()
        .slice(0, 10) === value
    );
  }

  private isValidDateTime(
    value: string,
  ): boolean {
    const parsed =
      new Date(value);

    return (
      !Number.isNaN(
        parsed.getTime(),
      ) &&
      value.includes('T')
    );
  }

  private isJsonValue(
    value: unknown,
  ): boolean {
    if (
      value === null ||
      typeof value === 'string' ||
      typeof value === 'boolean'
    ) {
      return true;
    }

    if (
      typeof value === 'number'
    ) {
      return Number.isFinite(value);
    }

    if (
      Array.isArray(value)
    ) {
      return value.every(
        (item) =>
          this.isJsonValue(item),
      );
    }

    if (
      typeof value === 'object'
    ) {
      return Object.values(
        value as Record<
          string,
          unknown
        >,
      ).every(
        (item) =>
          this.isJsonValue(item),
      );
    }

    return false;
  }
}