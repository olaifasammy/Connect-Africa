import { IQuery } from '@shared/application/queries/IQuery';

export class ExportEntitiesQuery implements IQuery {
  constructor(
    public readonly format: 'json' | 'csv' = 'json',
    public readonly status?: string,
    public readonly type?: string,
  ) {}
}
