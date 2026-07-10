import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class GetEntityBySlugQuery implements IQuery {
    readonly slug: string;
    constructor(slug: string);
}
