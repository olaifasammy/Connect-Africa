import { IQuery } from '@shared/application/queries/IQuery';

export class ListUsersQuery implements IQuery {
  constructor(public readonly adminUserId: string, public readonly ipAddress?: string) {}
}
