import { IQuery } from '../../../../shared/application/queries/IQuery';
export interface ListOntologiesQuery extends IQuery {
    limit?: number;
    offset?: number;
}
