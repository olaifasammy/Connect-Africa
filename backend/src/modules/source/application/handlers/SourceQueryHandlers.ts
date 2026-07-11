import { GetSourceQuery, SearchSourcesQuery } from '../queries/SourceQueries';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { Source } from '../../domain/entities/Source';

export class GetSourceHandler {
  constructor(private readonly repository: ISourceRepository) {}
  async handle(query: GetSourceQuery): Promise<Source | null> {
    return await this.repository.findById(query.sourceId);
  }
}

export class SearchSourcesHandler {
  constructor(private readonly repository: ISourceRepository) {}
  async handle(query: SearchSourcesQuery): Promise<Source[]> {
    return []; // Implementation requires repo method
  }
}
