import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import {
  GetSourceQuery,
  SearchSourcesQuery,
  ListSourcesQuery
} from '../queries/SourceQueries';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { Source } from '../../domain/entities/Source';

@provide(GetSourceHandler, true)
@injectable()
export class GetSourceHandler {
  constructor(
    @inject('ISourceRepository') private readonly repository: ISourceRepository
  ) {}

  async handle(query: GetSourceQuery): Promise<Source | null> {
    return await this.repository.findById(query.sourceId);
  }
}

@provide(ListSourcesHandler, true)
@injectable()
export class ListSourcesHandler {
  constructor(
    @inject('ISourceRepository') private readonly repository: ISourceRepository
  ) {}

  async handle(query: ListSourcesQuery): Promise<Source[]> {
    return await this.repository.list();
  }
}

@provide(SearchSourcesHandler, true)
@injectable()
export class SearchSourcesHandler {
  constructor(
    @inject('ISourceRepository') private readonly repository: ISourceRepository
  ) {}

  async handle(query: SearchSourcesQuery): Promise<Source[]> {
    return [];
  }
}
