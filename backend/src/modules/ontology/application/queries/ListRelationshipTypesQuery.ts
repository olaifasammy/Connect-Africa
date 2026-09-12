import { IQuery } from '@shared/application/queries/IQuery';

export interface ListRelationshipTypesQuery extends IQuery {
  ontologyId: string;
}
