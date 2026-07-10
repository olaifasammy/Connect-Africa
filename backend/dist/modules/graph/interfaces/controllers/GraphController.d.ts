import { Request, Response } from 'express';
import { GetGraphPathHandler } from '../../application/handlers/GetGraphPathHandler';
export declare class GraphController {
    private readonly getPathHandler;
    constructor(getPathHandler: GetGraphPathHandler);
    getPath(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
