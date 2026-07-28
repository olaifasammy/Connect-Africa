import { IQuery } from '@shared/application/queries/IQuery';

export class ListEntitiesQuery implements IQuery {
  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 20
  ) {}
}
