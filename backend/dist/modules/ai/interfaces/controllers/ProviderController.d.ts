import { Request, Response } from 'express';
import { GetProviderHealthHandler } from '../../application/handlers/GetProviderHealthHandler';
export declare class ProviderController {
    private readonly healthHandler;
    constructor(healthHandler: GetProviderHealthHandler);
    getHealth(req: Request, res: Response): Promise<void>;
}
