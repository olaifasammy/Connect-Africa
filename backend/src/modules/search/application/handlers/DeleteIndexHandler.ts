import { injectable, inject } from 'inversify';
import { SearchRepository } from '../../infrastructure/repositories/SearchRepository';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class DeleteIndexCommand {
  constructor(public readonly id: UniqueEntityId) {}
}

@injectable()
export class DeleteIndexHandler {
  constructor(@inject('ISearchRepository') private readonly repository: SearchRepository) {}

  async handle(command: DeleteIndexCommand): Promise<void> {
    await this.repository.delete(command.id);
  }
}
