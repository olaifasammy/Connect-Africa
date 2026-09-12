import { IQuery } from '@shared/application/queries/IQuery';
import { PaginationRequest } from '@shared/application/pagination/PaginationTypes';

export class ListEntitiesQuery implements IQuery {
  constructor(
    public readonly pagination: PaginationRequest = {
      strategy: 'offset',
      page: 1,
      limit: 20,
    },
  ) {}
}