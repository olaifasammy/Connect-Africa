import { IQuery } from '@shared/application/queries/IQuery';

export class GetEntityActivityQuery implements IQuery {
  constructor(public readonly limit: number = 20) {}
}
