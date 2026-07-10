import { IQuery } from '@shared/application/queries/IQuery';

export class SearchUsersQuery implements IQuery {
  constructor(
    public readonly adminUserId: string,
    public readonly searchTerm: string,
    public readonly ipAddress?: string
  ) {}
}
