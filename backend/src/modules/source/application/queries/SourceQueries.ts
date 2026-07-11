import { SourceId } from '../../domain/value-objects/SourceValueObjects';

export class GetSourceQuery {
  constructor(public readonly sourceId: SourceId) {}
}

export class SearchSourcesQuery {
  constructor(public readonly searchTerm: string) {}
}
