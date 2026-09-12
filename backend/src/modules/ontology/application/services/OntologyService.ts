import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';

import { IOntologyService } from './IOntologyService';

import {
  CreateOntologyDto,
  UpdateOntologyDto,
} from '@modules/ontology/application/dto/OntologyDtos';

import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';
import { Ontology } from '@modules/ontology/domain/entities/Ontology';
import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';
import { DomainError } from '@modules/ontology/domain/errors/DomainError';
import { UniqueOntologyPolicy } from '@modules/ontology/domain/policies/UniqueOntologyPolicy';

import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';
import { CacheProvider } from '@shared/infrastructure/cache/CacheProvider';

import { AuditLogRequestedEvent } from '@modules/audit/public';

interface CachedOntology {
  id: string;
  name: string;
  description: string;
  version: number;
  isPublished: boolean;
  isArchived: boolean;
}

@provide(OntologyService, true)
@injectable()
export class OntologyService implements IOntologyService {
  private readonly cacheTtlSeconds = 3600;

  constructor(
    @inject('IOntologyRepository')
    private readonly ontologyRepository: IOntologyRepository,

    private readonly uniqueOntologyPolicy: UniqueOntologyPolicy,

    @inject('EventBus')
    private readonly eventBus: EventBus,

    @inject('IMetricsProvider')
    private readonly metricsProvider: IMetricsProvider,

    @inject('CacheProvider')
    private readonly cacheProvider: CacheProvider,
  ) {}

  async create(
    dto: CreateOntologyDto,
    userId?: string,
    ipAddress?: string,
  ): Promise<Ontology> {
    const startTime = Date.now();

    try {
      await this.uniqueOntologyPolicy.validate(
        dto.name,
      );

      const ontology = Ontology.create({
        name: dto.name,
        description: dto.description,
        version: 1,
        isPublished: false,
        isArchived: false,
      });

      await this.ontologyRepository.save(
        ontology,
      );

      await this.publishDomainEvents(
        ontology,
      );

      await this.eventBus.publish(
        new AuditLogRequestedEvent({
          action: 'CREATE_ONTOLOGY',
          actorId: userId || 'SYSTEM',
          actorType: 'USER',
          ipAddress: ipAddress || '0.0.0.0',
          userAgent: 'unknown',
          resourceId:
            ontology.id.toString(),
          resourceType: 'ONTOLOGY',
          metadata: [
            {
              key: 'status',
              value: 'SUCCESS',
            },
            {
              key: 'previousState',
              value: 'N/A',
            },
            {
              key: 'newState',
              value: 'CREATED',
            },
          ],
        }),
      );

      this.metricsProvider.incrementCounter(
        'ontology_created_total',
        { status: 'success' },
      );

      this.metricsProvider.observeDuration(
        'ontology_creation_duration_seconds',
        (Date.now() - startTime) / 1000,
        { status: 'success' },
      );

      return ontology;
    } catch (error) {
      this.metricsProvider.incrementCounter(
        'ontology_created_total',
        { status: 'failure' },
      );

      throw error;
    }
  }

  async getById(
    id: string,
  ): Promise<Ontology> {
    const ontologyId =
      OntologyId.create(id);

    const cacheKey =
      this.getCacheKey(ontologyId);

    const cached =
      await this.cacheProvider.get(
        cacheKey,
      );

    if (cached) {
      const cachedOntology =
        this.parseCachedOntology(
          cached,
          ontologyId,
        );

      if (cachedOntology) {
        return cachedOntology;
      }

      await this.safeDeleteCache(
        cacheKey,
      );
    }

    const ontology =
      await this.ontologyRepository.findById(
        ontologyId,
      );

    if (!ontology) {
      throw new DomainError(
        `Ontology with ID ${ontologyId.toString()} not found.`,
      );
    }

    await this.cacheOntology(
      ontology,
    );

    return ontology;
  }

  async update(
    id: string,
    dto: UpdateOntologyDto,
    userId?: string,
    ipAddress?: string,
  ): Promise<Ontology> {
    const ontology =
      await this.getById(id);

    ontology.update(
      dto.name ?? ontology.name,
      dto.description ??
        ontology.description,
    );

    await this.ontologyRepository.save(
      ontology,
    );

    await this.invalidateCache(
      ontology.id,
    );

    await this.publishDomainEvents(
      ontology,
    );

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'UPDATE_ONTOLOGY',
        actorId: userId || 'SYSTEM',
        actorType: 'USER',
        ipAddress: ipAddress || '0.0.0.0',
        userAgent: 'unknown',
        resourceId:
          ontology.id.toString(),
        resourceType: 'ONTOLOGY',
        metadata: [
          {
            key: 'status',
            value: 'SUCCESS',
          },
          {
            key: 'previousState',
            value: 'UPDATED',
          },
          {
            key: 'newState',
            value: 'UPDATED',
          },
        ],
      }),
    );

    this.metricsProvider.incrementCounter(
      'ontology_updated_total',
      { status: 'success' },
    );

    return ontology;
  }

  async publish(
    id: string,
    userId?: string,
    ipAddress?: string,
  ): Promise<Ontology> {
    const ontology =
      await this.getById(id);

    ontology.publish();

    await this.ontologyRepository.save(
      ontology,
    );

    await this.invalidateCache(
      ontology.id,
    );

    await this.publishDomainEvents(
      ontology,
    );

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'PUBLISH_ONTOLOGY',
        actorId: userId || 'SYSTEM',
        actorType: 'USER',
        ipAddress: ipAddress || '0.0.0.0',
        userAgent: 'unknown',
        resourceId:
          ontology.id.toString(),
        resourceType: 'ONTOLOGY',
        metadata: [
          {
            key: 'status',
            value: 'SUCCESS',
          },
          {
            key: 'previousState',
            value: 'DRAFT',
          },
          {
            key: 'newState',
            value: 'PUBLISHED',
          },
        ],
      }),
    );

    this.metricsProvider.incrementCounter(
      'ontology_published_total',
      { status: 'success' },
    );

    return ontology;
  }

  async archive(
    id: string,
    userId?: string,
    ipAddress?: string,
  ): Promise<Ontology> {
    const ontology =
      await this.getById(id);

    ontology.archive();

    await this.ontologyRepository.save(
      ontology,
    );

    await this.invalidateCache(
      ontology.id,
    );

    await this.publishDomainEvents(
      ontology,
    );

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'ARCHIVE_ONTOLOGY',
        actorId: userId || 'SYSTEM',
        actorType: 'USER',
        ipAddress: ipAddress || '0.0.0.0',
        userAgent: 'unknown',
        resourceId:
          ontology.id.toString(),
        resourceType: 'ONTOLOGY',
        metadata: [
          {
            key: 'status',
            value: 'SUCCESS',
          },
          {
            key: 'previousState',
            value: 'ACTIVE',
          },
          {
            key: 'newState',
            value: 'ARCHIVED',
          },
        ],
      }),
    );

    this.metricsProvider.incrementCounter(
      'ontology_archived_total',
      { status: 'success' },
    );

    return ontology;
  }

  private getCacheKey(
    id: OntologyId,
  ): string {
    return `ontology:${id.toString()}`;
  }

  private async cacheOntology(
    ontology: Ontology,
  ): Promise<void> {
    const payload: CachedOntology = {
      id: ontology.id.toString(),
      name: ontology.name,
      description: ontology.description,
      version: ontology.version,
      isPublished:
        ontology.isPublished,
      isArchived:
        ontology.isArchived,
    };

    await this.cacheProvider.set(
      this.getCacheKey(ontology.id),
      JSON.stringify(payload),
      this.cacheTtlSeconds,
    );
  }

  private parseCachedOntology(
    cached: string,
    expectedId: OntologyId,
  ): Ontology | null {
    try {
      const data: unknown =
        JSON.parse(cached);

      if (
        !data ||
        typeof data !== 'object'
      ) {
        return null;
      }

      const candidate =
        data as Partial<CachedOntology>;

      const version =
        candidate.version;

      if (
        candidate.id !==
          expectedId.toString() ||
        typeof candidate.name !==
          'string' ||
        typeof candidate.description !==
          'string' ||
        typeof version !== 'number' ||
        !Number.isInteger(version) ||
        version < 1 ||
        typeof candidate.isPublished !==
          'boolean' ||
        typeof candidate.isArchived !==
          'boolean'
      ) {
        return null;
      }

      if (
        candidate.isPublished &&
        candidate.isArchived
      ) {
        return null;
      }

      return Ontology.reconstruct(
        {
          name: candidate.name,
          description:
            candidate.description,
          version,
          isPublished:
            candidate.isPublished,
          isArchived:
            candidate.isArchived,
        },
        expectedId,
      );
    } catch {
      return null;
    }
  }

  private async invalidateCache(
    id: OntologyId,
  ): Promise<void> {
    await this.safeDeleteCache(
      this.getCacheKey(id),
    );
  }

  private async safeDeleteCache(
    cacheKey: string,
  ): Promise<void> {
    try {
      await this.cacheProvider.delete(
        cacheKey,
      );
    } catch {
      /*
       * Cache invalidation must not turn a
       * successfully persisted domain mutation
       * into an application failure.
       *
       * The next read will repopulate the cache
       * from PostgreSQL.
       */
    }
  }

  private async publishDomainEvents(
    ontology: Ontology,
  ): Promise<void> {
    const events = [
      ...ontology.domainEvents,
    ];

    for (const event of events) {
      await this.eventBus.publish(event);
    }

    ontology.clearDomainEvents();
  }
}