import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { OntologyCreatedEvent } from '@modules/ontology/public';
import { ISearchRepository } from '../../domain/repositories/ISearchRepository';
import { SearchDocument } from '../../domain/models/SearchDocument';

@provide(OntologyCreatedIndexer, true)
@injectable()
export class OntologyCreatedIndexer {
  constructor(
    @inject('ISearchRepository')
    private readonly searchRepository: ISearchRepository,
  ) {}

  async handle(
    event: OntologyCreatedEvent,
  ): Promise<void> {
    const resourceId =
      event.ontologyId;

    const document = new SearchDocument({
      id: resourceId,
      resourceType: 'ontology',
      resourceId,
      content: {
        title: event.name,
      },
      createdAt: new Date(),
    });

    await this.searchRepository.save(
      document,
    );
  }
}