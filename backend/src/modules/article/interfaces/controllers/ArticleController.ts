import { Request, Response } from 'express';
import { CreateArticleHandler } from '../../application/handlers/CreateArticleHandler';
import { UpdateArticleHandler } from '../../application/handlers/UpdateArticleHandler';
import { DeleteArticleHandler } from '../../application/handlers/DeleteArticleHandler';
import { PublishArticleHandler } from '../../application/handlers/PublishArticleHandler';
import { ArchiveArticleHandler } from '../../application/handlers/ArchiveArticleHandler';
import { SubmitForReviewHandler } from '../../application/handlers/SubmitForReviewHandler';
import { ApproveArticleHandler } from '../../application/handlers/ApproveArticleHandler';
import { CreateArticleCommand } from '../../application/commands/CreateArticleCommand';
import { UpdateArticleCommand } from '../../application/commands/UpdateArticleCommand';
import { DeleteArticleCommand } from '../../application/commands/DeleteArticleCommand';
import { PublishArticleCommand } from '../../application/commands/PublishArticleCommand';
import { ArchiveArticleCommand } from '../../application/commands/ArchiveArticleCommand';
import { SubmitForReviewCommand } from '../../application/commands/SubmitForReviewCommand';
import { ApproveArticleCommand } from '../../application/commands/ApproveArticleCommand';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';

export class ArticleController {
  constructor(
    private readonly createArticleHandler: CreateArticleHandler,
    private readonly updateArticleHandler: UpdateArticleHandler,
    private readonly deleteArticleHandler: DeleteArticleHandler,
    private readonly publishArticleHandler: PublishArticleHandler,
    private readonly archiveArticleHandler: ArchiveArticleHandler,
    private readonly submitForReviewHandler: SubmitForReviewHandler,
    private readonly approveArticleHandler: ApproveArticleHandler,
    private readonly metrics: IMetricsProvider
  ) {}

  private track(action: string) {
    this.metrics.incrementCounter('article_operations_total', { action });
  }

  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const { title, summary, content } = req.body;
    const command = new CreateArticleCommand(title, summary, content, new UniqueEntityId(userId));
    const articleId = await this.createArticleHandler.handle(command);
    this.track('create');
    res.status(201).json({ id: articleId });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { title, summary, content } = req.body;
    const command = new UpdateArticleCommand(new UniqueEntityId(req.params.id as string), title, summary, content);
    await this.updateArticleHandler.handle(command);
    this.track('update');
    res.status(200).json({ success: true });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const command = new DeleteArticleCommand(new UniqueEntityId(req.params.id as string));
    await this.deleteArticleHandler.handle(command);
    this.track('delete');
    res.status(204).send();
  }

  async publish(req: Request, res: Response): Promise<void> {
    const command = new PublishArticleCommand(new UniqueEntityId(req.params.id as string));
    await this.publishArticleHandler.handle(command);
    this.track('publish');
    res.status(200).json({ success: true });
  }

  async archive(req: Request, res: Response): Promise<void> {
    const command = new ArchiveArticleCommand(new UniqueEntityId(req.params.id as string));
    await this.archiveArticleHandler.handle(command);
    this.track('archive');
    res.status(200).json({ success: true });
  }

  async submitForReview(req: Request, res: Response): Promise<void> {
    const command = new SubmitForReviewCommand(new UniqueEntityId(req.params.id as string));
    await this.submitForReviewHandler.handle(command);
    this.track('submit_for_review');
    res.status(200).json({ success: true });
  }

  async approve(req: Request, res: Response): Promise<void> {
    const command = new ApproveArticleCommand(new UniqueEntityId(req.params.id as string));
    await this.approveArticleHandler.handle(command);
    this.track('approve');
    res.status(200).json({ success: true });
  }
}
