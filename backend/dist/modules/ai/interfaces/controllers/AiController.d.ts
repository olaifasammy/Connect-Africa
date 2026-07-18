import { Request, Response } from 'express';
import { ProcessAiRequestHandler } from '../../application/handlers/ProcessAiRequestHandler';
export declare class AiController {
    private readonly aiHandler;
    constructor(aiHandler: ProcessAiRequestHandler);
    process(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
