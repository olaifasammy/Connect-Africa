import { IQuery } from '@shared/application/queries/IQuery';

export class GetBookmarksQuery implements IQuery {
  constructor(public readonly userId: string, public readonly ipAddress?: string) {}
}
