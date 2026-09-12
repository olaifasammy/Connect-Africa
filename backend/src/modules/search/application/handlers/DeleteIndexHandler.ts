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
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

export class DeleteIndexCommand {
  constructor(
    public readonly id:
      UniqueEntityId,
  ) {}
}

@provide(
  DeleteIndexHandler,
  true,
)
@injectable()
export class DeleteIndexHandler {
  constructor(
    @inject('ISearchRepository')
    private readonly repository:
      ISearchRepository,
  ) {}

  async handle(
    command: DeleteIndexCommand,
  ): Promise<void> {
    await this.repository.delete(
      command.id,
    );
  }
}