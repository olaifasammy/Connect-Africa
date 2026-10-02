import { IQuery } from '@shared/application/queries/IQuery';
import { PaginationRequest } from '@shared/application/pagination/PaginationTypes';

export class GetVerificationQueueQuery implements IQuery {
  constructor(public readonly pagination: PaginationRequest) {}
}
