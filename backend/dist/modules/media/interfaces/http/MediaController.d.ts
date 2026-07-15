import { Request, Response } from 'express';
import { UploadMediaHandler } from '../../application/commands/UploadMediaHandler';
import { AttachMediaHandler } from '../../application/commands/AttachMediaHandler';
export declare class MediaController {
    private readonly uploadMediaHandler;
    private readonly attachMediaHandler;
    constructor(uploadMediaHandler: UploadMediaHandler, attachMediaHandler: AttachMediaHandler);
    upload(req: Request, res: Response): Promise<void>;
    attach(req: Request, res: Response): Promise<void>;
}
