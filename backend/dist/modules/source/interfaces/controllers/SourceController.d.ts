import { Request, Response } from 'express';
import { CreateSourceHandler } from '../../application/handlers/CreateSourceHandler';
import { UpdateSourceHandler, DeleteSourceHandler } from '../../application/handlers/SourceCommandHandlers';
import { GetSourceHandler } from '../../application/handlers/SourceQueryHandlers';
import { IMetricsProvider } from '../../../../shared/monitoring/IMetricsProvider';
export declare class SourceController {
    private readonly createSourceHandler;
    private readonly updateSourceHandler;
    private readonly deleteSourceHandler;
    private readonly getSourceHandler;
    private readonly metrics;
    constructor(createSourceHandler: CreateSourceHandler, updateSourceHandler: UpdateSourceHandler, deleteSourceHandler: DeleteSourceHandler, getSourceHandler: GetSourceHandler, metrics: IMetricsProvider);
    private track;
    create(req: Request, res: Response): Promise<void>;
    get(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
