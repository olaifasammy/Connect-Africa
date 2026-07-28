import { OntologyVersion } from '../entities/OntologyVersion';
import { DomainError } from '../errors/DomainError';

export class VersionPublishingPolicy {
  public validate(version: OntologyVersion): void {
    if (version.isPublished) {
      throw new DomainError('Cannot modify a published ontology version.');
    }
  }
}
