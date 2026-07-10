import { IQuery } from '@shared/application/queries/IQuery';

export interface ListEntityTypesQuery extends IQuery {
  ontologyId: string;
}
