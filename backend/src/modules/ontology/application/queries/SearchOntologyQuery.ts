import { IQuery } from '@shared/application/queries/IQuery';

export interface SearchOntologyQuery extends IQuery {
  term: string;
}
