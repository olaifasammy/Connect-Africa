import { IQuery } from '@shared/application/queries/IQuery';
export class GetEntityBySlugQuery implements IQuery {
  constructor(public readonly slug: string) {}
}
