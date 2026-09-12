import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import {
  IOntologyVersionRepository,
} from '@modules/ontology/domain/repositories/IOntologyVersionRepository';

import {
  IOntologyRepository,
} from '@modules/ontology/domain/repositories/IOntologyRepository';

import { OntologyVersion } from '@modules/ontology/domain/entities/OntologyVersion';

import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';

import { DomainError } from '@modules/ontology/domain/errors/DomainError';

import { EventBus } from '@shared/infrastructure/queue/EventBus';

import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import { OntologyVersionCreatedEvent } from '@modules/ontology/domain/events/OntologyVersionCreatedEvent';
import { OntologyVersionPublishedEvent } from '@modules/ontology/domain/events/OntologyVersionPublishedEvent';
import { OntologyVersionRollbackEvent } from '@modules/ontology/domain/events/OntologyVersionRollbackEvent';

import { VersionPublishingPolicy } from '@modules/ontology/domain/policies/VersionPublishingPolicy';

import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

@provide(OntologyVersionService, true)
@injectable()
export class OntologyVersionService {
  constructor(
    @inject('IOntologyVersionRepository')
    private readonly ontologyVersionRepository: IOntologyVersionRepository,

    @inject('IOntologyRepository')
    private readonly ontologyRepository: IOntologyRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,

    private readonly versionPublishingPolicy: VersionPublishingPolicy,

    private readonly postgresProvider: PostgresProvider,
  ) {}

  async createVersion(
    ontologyId: string,
  ): Promise<OntologyVersion> {
    const normalizedOntologyId =
      OntologyId.create(ontologyId);

    const result =
      await this.postgresProvider.transaction(
        async () => {
          const ontology =
            await this.ontologyRepository.findByIdForUpdate(
              normalizedOntologyId,
            );

          if (!ontology) {
            throw new DomainError(
              'Ontology not found.',
            );
          }

          if (ontology.isArchived) {
            throw new DomainError(
              'Archived ontologies cannot create new versions.',
            );
          }

          const nextVersion =
            ontology.incrementVersion();

          await this.ontologyRepository.save(
            ontology,
          );

          const version =
            OntologyVersion.create({
              ontologyId:
                new UniqueEntityId(
                  normalizedOntologyId.toString(),
                ),
              version: nextVersion,
              isPublished: false,
              createdAt: new Date(),
            });

          await this.ontologyVersionRepository.save(
            version,
          );

          return version;
        },
      );

    await this.eventBus.publish(
      new OntologyVersionCreatedEvent(
        new UniqueEntityId(
          result.id.toString(),
        ),
      ),
    );

    return result;
  }

  async publishVersion(
    id: string,
  ): Promise<void> {
    const version =
      await this.ontologyVersionRepository.findById(
        new UniqueEntityId(id),
      );

    if (!version) {
      throw new DomainError(
        'Ontology Version not found.',
      );
    }

    this.versionPublishingPolicy.validate(
      version,
    );

    const ontology =
      await this.ontologyRepository.findById(
        OntologyId.create(
          version.ontologyId.toString(),
        ),
      );

    if (!ontology) {
      throw new DomainError(
        'Ontology not found.',
      );
    }

    if (ontology.isArchived) {
      throw new DomainError(
        'Cannot publish a version of an archived ontology.',
      );
    }

    version.publish();

    await this.ontologyVersionRepository.save(
      version,
    );

    await this.eventBus.publish(
      new OntologyVersionPublishedEvent(
        new UniqueEntityId(
          version.id.toString(),
        ),
      ),
    );
  }

  async rollbackVersion(
    id: string,
  ): Promise<void> {
    const version =
      await this.ontologyVersionRepository.findById(
        new UniqueEntityId(id),
      );

    if (!version) {
      throw new DomainError(
        'Ontology Version not found.',
      );
    }

    if (!version.isPublished) {
      throw new DomainError(
        'Ontology Version is not published, cannot rollback.',
      );
    }

    const ontology =
      await this.ontologyRepository.findById(
        OntologyId.create(
          version.ontologyId.toString(),
        ),
      );

    if (!ontology) {
      throw new DomainError(
        'Ontology not found.',
      );
    }

    if (ontology.isArchived) {
      throw new DomainError(
        'Archived ontologies cannot be rolled back.',
      );
    }

    /*
     * Rollback remains intentionally non-mutating because the
     * current persistence model has no canonical active-version
     * field. Emitting a rollback event without mutating unrelated
     * version records avoids fabricating rollback semantics.
     */
    await this.eventBus.publish(
      new OntologyVersionRollbackEvent(
        new UniqueEntityId(
          version.id.toString(),
        ),
      ),
    );
  }
}
