import { inject } from 'inversify';
import { GetSourceQuery, SearchSourcesQuery, ListSourcesQuery } from '../queries/SourceQueries';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { Source } from '../../domain/entities/Source';

export class GetSourceHandler {
  constructor(
    @inject('ISourceRepository') private readonly repository: ISourceRepository
  ) {}
  async handle(query: GetSourceQuery): Promise<Source | null> {
    return await this.repository.findById(query.sourceId);
  }
}

export class ListSourcesHandler {
  constructor(private readonly repository: ISourceRepository) {}
  async handle(query: ListSourcesQuery): Promise<Source[]> {
    return await this.repository.list();
  }
}

export class SearchSourcesHandler {
  constructor(private readonly repository: ISourceRepository) {}
  async handle(query: SearchSourcesQuery): Promise<Source[]> {
    return []; // Implementation requires repo method
  }
}
