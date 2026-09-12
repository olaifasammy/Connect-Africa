import {
  injectable,
  inject,
} from 'inversify';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  ISearchRepository,
} from '../../domain/repositories/ISearchRepository';

import {
  SearchDocument,
} from '../../domain/models/SearchDocument';

export class IndexDocumentCommand {
  constructor(
    public readonly document:
      SearchDocument,
  ) {}
}

@provide(
  IndexDocumentHandler,
  true,
)
@injectable()
export class IndexDocumentHandler {
  constructor(
    @inject('ISearchRepository')
    private readonly repository:
      ISearchRepository,
  ) {}

  async handle(
    command: IndexDocumentCommand,
  ): Promise<void> {
    await this.repository.save(
      command.document,
    );
  }
}