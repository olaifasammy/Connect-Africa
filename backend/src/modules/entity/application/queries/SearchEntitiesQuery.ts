import { IQuery } from '@shared/application/queries/IQuery';

export class SearchEntitiesQuery implements IQuery {
  constructor(public readonly term: string) {}
}
