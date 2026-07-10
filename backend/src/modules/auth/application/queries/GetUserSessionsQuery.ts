import { IQuery } from '@shared/application/queries/IQuery';

export class GetUserSessionsQuery implements IQuery {
  constructor(public readonly userId: string, public readonly adminUserId?: string, public readonly ipAddress?: string) {}
}
