import { IQuery } from '@shared/application/queries/IQuery';

export class GetReadingProgressQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly articleId: string
  ) {}
}
