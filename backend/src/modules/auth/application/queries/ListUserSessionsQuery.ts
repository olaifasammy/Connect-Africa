import { IQuery } from '@shared/application/queries/IQuery';

export class ListUserSessionsQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
