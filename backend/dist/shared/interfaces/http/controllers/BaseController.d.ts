import { Response } from 'express';
export declare abstract class BaseController {
    protected handleError(res: Response, error: any): void;
}
