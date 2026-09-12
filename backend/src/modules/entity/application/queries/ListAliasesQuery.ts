import { IQuery } from '@shared/application/queries/IQuery';
export class ListAliasesQuery implements IQuery {
  constructor(public readonly entityId: string) {}
}
