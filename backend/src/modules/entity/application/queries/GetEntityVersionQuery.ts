import { IQuery } from '@shared/application/queries/IQuery';
export class GetEntityVersionQuery implements IQuery {
  constructor(public readonly entityId: string, public readonly versionId: string) {}
}
