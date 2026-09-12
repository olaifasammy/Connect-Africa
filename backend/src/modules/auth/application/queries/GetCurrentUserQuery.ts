import { IQuery } from '@shared/application/queries/IQuery';

export class GetCurrentUserQuery implements IQuery {
  constructor(public readonly userId: string, public readonly ipAddress?: string) {}
}
