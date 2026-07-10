import { IQuery } from '@shared/application/queries/IQuery';

export class GetEntityQuery implements IQuery {
  constructor(public readonly entityId: string) {}
}
