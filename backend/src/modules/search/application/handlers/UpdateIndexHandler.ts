import {
  provide,
} from 'inversify-binding-decorators';

import {
  injectable,
  inject,
} from 'inversify';

import {
  ISearchRepository,
} from '../../domain/repositories/ISearchRepository';

import {
  SearchDocument,
} from '../../domain/models/SearchDocument';

export class UpdateIndexCommand {
  constructor(
    public readonly document:
      SearchDocument,
  ) {}
}

@provide(
  UpdateIndexHandler,
  true,
)
@injectable()
export class UpdateIndexHandler {
  constructor(
    @inject('ISearchRepository')
    private readonly repository:
      ISearchRepository,
  ) {}

  async handle(
    command: UpdateIndexCommand,
  ): Promise<void> {
    await this.repository.save(
      command.document,
    );
  }
}