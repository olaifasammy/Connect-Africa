import { Request, Response } from 'express';
import { CreateArticleHandler } from '../../application/handlers/CreateArticleHandler';
import { UpdateArticleHandler } from '../../application/handlers/UpdateArticleHandler';
import { DeleteArticleHandler } from '../../application/handlers/DeleteArticleHandler';
import { PublishArticleHandler } from '../../application/handlers/PublishArticleHandler';
import { ArchiveArticleHandler } from '../../application/handlers/ArchiveArticleHandler';
import { SubmitForReviewHandler } from '../../application/handlers/SubmitForReviewHandler';
import { ApproveArticleHandler } from '../../application/handlers/ApproveArticleHandler';
import { IMetricsProvider } from '../../../../shared/monitoring/IMetricsProvider';
export declare class ArticleController {
    private readonly createArticleHandler;
    private readonly updateArticleHandler;
    private readonly deleteArticleHandler;
    private readonly publishArticleHandler;
    private readonly archiveArticleHandler;
    private readonly submitForReviewHandler;
    private readonly approveArticleHandler;
    private readonly metrics;
    constructor(createArticleHandler: CreateArticleHandler, updateArticleHandler: UpdateArticleHandler, deleteArticleHandler: DeleteArticleHandler, publishArticleHandler: PublishArticleHandler, archiveArticleHandler: ArchiveArticleHandler, submitForReviewHandler: SubmitForReviewHandler, approveArticleHandler: ApproveArticleHandler, metrics: IMetricsProvider);
    private track;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    publish(req: Request, res: Response): Promise<void>;
    archive(req: Request, res: Response): Promise<void>;
    submitForReview(req: Request, res: Response): Promise<void>;
    approve(req: Request, res: Response): Promise<void>;
}
