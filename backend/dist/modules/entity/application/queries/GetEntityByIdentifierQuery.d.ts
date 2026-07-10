import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class GetEntityByIdentifierQuery implements IQuery {
    readonly identifier: string;
    constructor(identifier: string);
}
