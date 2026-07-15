import { injectable, inject } from 'inversify';
import { SearchRepository } from '../../infrastructure/repositories/SearchRepository';
import { SearchDocument } from '../../domain/models/SearchDocument';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class IndexDocumentCommand {
  constructor(public readonly document: SearchDocument) {}
}

@injectable()
export class IndexDocumentHandler {
  constructor(@inject('ISearchRepository') private readonly repository: SearchRepository) {}

  async handle(command: IndexDocumentCommand): Promise<void> {
    await this.repository.save(command.document);
  }
}
