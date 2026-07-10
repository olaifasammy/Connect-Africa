import { IQuery } from '@shared/application/queries/IQuery';
export class GetEntityByIdentifierQuery implements IQuery {
  constructor(public readonly identifier: string) {}
}
