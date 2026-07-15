import { injectable, inject } from 'inversify';
import { SearchRepository } from '../../infrastructure/repositories/SearchRepository';
import { SearchDocument } from '../../domain/models/SearchDocument';

export class UpdateIndexCommand {
  constructor(public readonly document: SearchDocument) {}
}

@injectable()
export class UpdateIndexHandler {
  constructor(@inject('ISearchRepository') private readonly repository: SearchRepository) {}

  async handle(command: UpdateIndexCommand): Promise<void> {
    await this.repository.save(command.document);
  }
}
