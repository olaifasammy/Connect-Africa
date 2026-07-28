import { injectable, inject } from 'inversify';
import { SearchRepository } from '../../infrastructure/repositories/SearchRepository';
import { SearchDocument } from '../../domain/models/SearchDocument';

export class BulkIndexCommand {
  constructor(public readonly documents: SearchDocument[]) {}
}

@injectable()
export class BulkIndexHandler {
  constructor(@inject('ISearchRepository') private readonly repository: SearchRepository) {}

  async handle(command: BulkIndexCommand): Promise<void> {
    await this.repository.bulkSave(command.documents);
  }
}
