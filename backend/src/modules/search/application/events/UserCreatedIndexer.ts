import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { UserCreatedEvent } from '@modules/auth/public';
import { ISearchRepository } from '../../domain/repositories/ISearchRepository';
import { SearchDocument } from '../../domain/models/SearchDocument';

@provide(UserCreatedIndexer, true)
@injectable()
export class UserCreatedIndexer {
  constructor(
    @inject('ISearchRepository')
    private readonly searchRepository: ISearchRepository,
  ) {}

  async handle(
    event: UserCreatedEvent,
  ): Promise<void> {
    const resourceId =
      event.userId;

    const document = new SearchDocument({
      id: resourceId,
      resourceType: 'user',
      resourceId,
      content: {
        email: event.email,
      },
      createdAt: new Date(),
    });

    await this.searchRepository.save(
      document,
    );
  }
}