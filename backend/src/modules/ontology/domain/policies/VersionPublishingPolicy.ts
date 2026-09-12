import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { OntologyVersion } from '../entities/OntologyVersion';
import { DomainError } from '../errors/DomainError';

@provide(VersionPublishingPolicy, true)
@injectable()
export class VersionPublishingPolicy {
  public validate(
    version: OntologyVersion,
  ): void {
    if (version.isPublished) {
      throw new DomainError(
        'Cannot modify a published ontology version.',
      );
    }
  }
}