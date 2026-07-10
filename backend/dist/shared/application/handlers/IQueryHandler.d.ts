import { IQuery } from '../queries/IQuery';
export interface IQueryHandler<T extends IQuery, R> {
    handle(query: T): Promise<R>;
}
