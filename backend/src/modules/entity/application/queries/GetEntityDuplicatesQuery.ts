import { IQuery } from '@shared/application/queries/IQuery';

export class GetEntityDuplicatesQuery implements IQuery {
  constructor(public readonly threshold: number = 0.4) {}
}
