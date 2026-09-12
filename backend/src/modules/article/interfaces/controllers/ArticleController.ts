import { inject } from 'inversify';
import { Request, Response } from 'express';
import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';
import { CreateArticleHandler } from '../../application/handlers/CreateArticleHandler';
import { UpdateArticleHandler } from '../../application/handlers/UpdateArticleHandler';
import { DeleteArticleHandler } from '../../application/handlers/DeleteArticleHandler';
import { PublishArticleHandler } from '../../application/handlers/PublishArticleHandler';
import { ArchiveArticleHandler } from '../../application/handlers/ArchiveArticleHandler';
import { SubmitForReviewHandler } from '../../application/handlers/SubmitForReviewHandler';
import { ApproveArticleHandler } from '../../application/handlers/ApproveArticleHandler';
import { RejectArticleHandler } from '../../application/handlers/RejectArticleHandler';
import { UnpublishArticleHandler } from '../../application/handlers/UnpublishArticleHandler';
import { RestoreArticleHandler } from '../../application/handlers/RestoreArticleHandler';
import { LinkEntityHandler } from '../../application/handlers/LinkEntityHandler';
import { UnlinkEntityHandler } from '../../application/handlers/UnlinkEntityHandler';
import { GetArticleHandler, GetArticleBySlugHandler, GetLatestArticlesHandler, GetArticlesByEntityHandler, GetArticlesByCategoryHandler, SearchArticlesHandler } from '../../application/handlers/ArticleQueryHandlers';
import { AddBookmarkCommandHandler } from '../../application/handlers/AddBookmarkCommandHandler';
import { AddToReadingHistoryCommandHandler } from '../../application/handlers/AddToReadingHistoryCommandHandler';
import { UpdateReadingProgressCommandHandler } from '../../application/handlers/UpdateReadingProgressCommandHandler';
import { GetBookmarksQueryHandler } from '../../application/handlers/queries/GetBookmarksQueryHandler';
import { GetReadingHistoryQueryHandler } from '../../application/handlers/queries/GetReadingHistoryQueryHandler';
import { CreateArticleCommand } from '../../application/commands/CreateArticleCommand';
import { UpdateArticleCommand } from '../../application/commands/UpdateArticleCommand';
import { DeleteArticleCommand } from '../../application/commands/DeleteArticleCommand';
import { PublishArticleCommand } from '../../application/commands/PublishArticleCommand';
import { ArchiveArticleCommand } from '../../application/commands/ArchiveArticleCommand';
import { SubmitForReviewCommand } from '../../application/commands/SubmitForReviewCommand';
import { ApproveArticleCommand } from '../../application/commands/ApproveArticleCommand';
import { RejectArticleCommand } from '../../application/commands/RejectArticleCommand';
import { UnpublishArticleCommand } from '../../application/commands/UnpublishArticleCommand';
import { RestoreArticleCommand } from '../../application/commands/RestoreArticleCommand';
import { LinkEntityCommand } from '../../application/commands/LinkEntityCommand';
import { UnlinkEntityCommand } from '../../application/commands/UnlinkEntityCommand';
import { GetArticleQuery, GetArticleBySlugQuery, GetLatestArticlesQuery, GetArticlesByEntityQuery, GetArticlesByCategoryQuery, SearchArticlesQuery } from '../../application/queries/ArticleQueries';
import { AddBookmarkCommand } from '../../application/commands/AddBookmarkCommand';
import { AddToReadingHistoryCommand } from '../../application/commands/AddToReadingHistoryCommand';
import { UpdateReadingProgressCommand } from '../../application/commands/UpdateReadingProgressCommand';
import { GetBookmarksQuery } from '../../application/queries/GetBookmarksQuery';
import { GetReadingHistoryQuery } from '../../application/queries/GetReadingHistoryQuery';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';

@provide(ArticleController, true)
@injectable()
export class ArticleController {
  constructor(
    private readonly createArticleHandler: CreateArticleHandler,
    private readonly updateArticleHandler: UpdateArticleHandler,
    private readonly deleteArticleHandler: DeleteArticleHandler,
    private readonly publishArticleHandler: PublishArticleHandler,
    private readonly archiveArticleHandler: ArchiveArticleHandler,
    private readonly submitForReviewHandler: SubmitForReviewHandler,
    private readonly approveArticleHandler: ApproveArticleHandler,
    private readonly rejectArticleHandler: RejectArticleHandler,
    private readonly unpublishArticleHandler: UnpublishArticleHandler,
    private readonly restoreArticleHandler: RestoreArticleHandler,
    private readonly linkEntityHandler: LinkEntityHandler,
    private readonly unlinkEntityHandler: UnlinkEntityHandler,
    private readonly getArticleHandler: GetArticleHandler,
    private readonly getArticleBySlugHandler: GetArticleBySlugHandler,
    private readonly getLatestArticlesHandler: GetLatestArticlesHandler,
    private readonly getArticlesByEntityHandler: GetArticlesByEntityHandler,
    private readonly getArticlesByCategoryHandler: GetArticlesByCategoryHandler,
    private readonly searchArticlesHandler: SearchArticlesHandler,
    private readonly addBookmarkHandler: AddBookmarkCommandHandler,
    private readonly addToReadingHistoryHandler: AddToReadingHistoryCommandHandler,
    private readonly updateReadingProgressHandler: UpdateReadingProgressCommandHandler,
    private readonly getBookmarksQueryHandler: GetBookmarksQueryHandler,
    private readonly getReadingHistoryQueryHandler: GetReadingHistoryQueryHandler,
    @inject('IMetricsProvider') private readonly metrics: IMetricsProvider
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
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const command = new DeleteArticleCommand(new UniqueEntityId(req.params.id as string), userId);
    await this.deleteArticleHandler.handle(command);
    this.track('delete');
    res.status(204).send();
  }

  async publish(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const command = new PublishArticleCommand(new UniqueEntityId(req.params.id as string), userId);
    await this.publishArticleHandler.handle(command);
    this.track('publish');
    res.status(200).json({ success: true });
  }

  async unpublish(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const command = new UnpublishArticleCommand(new UniqueEntityId(req.params.id as string), userId);
    await this.unpublishArticleHandler.handle(command);
    this.track('unpublish');
    res.status(200).json({ success: true });
  }

  async archive(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const command = new ArchiveArticleCommand(new UniqueEntityId(req.params.id as string), userId);
    await this.archiveArticleHandler.handle(command);
    this.track('archive');
    res.status(200).json({ success: true });
  }

  async submitForReview(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const command = new SubmitForReviewCommand(new UniqueEntityId(req.params.id as string), userId);
    await this.submitForReviewHandler.handle(command);
    this.track('submit_for_review');
    res.status(200).json({ success: true });
  }

  async approve(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const command = new ApproveArticleCommand(new UniqueEntityId(req.params.id as string), userId);
    await this.approveArticleHandler.handle(command);
    this.track('approve');
    res.status(200).json({ success: true });
  }

  async reject(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const command = new RejectArticleCommand(new UniqueEntityId(req.params.id as string), userId, req.body.reason);
    await this.rejectArticleHandler.handle(command);
    this.track('reject');
    res.status(200).json({ success: true });
  }

  async restore(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const command = new RestoreArticleCommand(new UniqueEntityId(req.params.id as string), new UniqueEntityId(req.body.revisionId), req.body.version ?? 1);
    await this.restoreArticleHandler.handle(command);
    this.track('restore');
    res.status(200).json({ success: true });
  }

  async linkEntity(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }
    const command = new LinkEntityCommand(
      new UniqueEntityId(req.params.id as string),
      new UniqueEntityId(req.body.entityId),
      userId
    );
    await this.linkEntityHandler.handle(command);
    this.track('link_entity');
    res.status(200).json({ success: true });
  }

  async unlinkEntity(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }
    const command = new UnlinkEntityCommand(
      new UniqueEntityId(req.params.id as string),
      new UniqueEntityId(req.params.entityId as string),
      userId
    );
    await this.unlinkEntityHandler.handle(command);
    this.track('unlink_entity');
    res.status(200).json({ success: true });
  }

  async getById(req: Request, res: Response): Promise<void> {
    const query = new GetArticleQuery(new UniqueEntityId(req.params.id as string));
    const article = await this.getArticleHandler.handle(query);
    if (!article) {
      res.status(404).json({ success: false, error: 'Article not found' });
      return;
    }
    res.status(200).json(article);
  }

  async getBySlug(req: Request, res: Response): Promise<void> {
    const query = new GetArticleBySlugQuery(req.params.slug as string);
    const article = await this.getArticleBySlugHandler.handle(query);
    if (!article) {
      res.status(404).json({ success: false, error: 'Article not found' });
      return;
    }
    res.status(200).json(article);
  }

  async getLatest(req: Request, res: Response): Promise<void> {
    const query = new GetLatestArticlesQuery(Number(req.query.limit) || 20);
    const articles = await this.getLatestArticlesHandler.handle(query);
    res.status(200).json(articles);
  }

  async getByEntity(req: Request, res: Response): Promise<void> {
    const query = new GetArticlesByEntityQuery(new UniqueEntityId(req.params.entityId as string));
    const articles = await this.getArticlesByEntityHandler.handle(query);
    res.status(200).json(articles);
  }

  async getByCategory(req: Request, res: Response): Promise<void> {
    const query = new GetArticlesByCategoryQuery(req.params.category as string);
    const articles = await this.getArticlesByCategoryHandler.handle(query);
    res.status(200).json(articles);
  }

  async search(req: Request, res: Response): Promise<void> {
    const q = req.query.q;
    const searchTerm = typeof q === 'string' ? q : (Array.isArray(q) && typeof q[0] === 'string' ? q[0] : '');
    const query = new SearchArticlesQuery(searchTerm);
    const articles = await this.searchArticlesHandler.handle(query);
    res.status(200).json(articles);
  }

  async addBookmark(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const command = new AddBookmarkCommand(userId, req.body.articleId, req.ip ?? '');
    await this.addBookmarkHandler.handle(command);
    this.track('add_bookmark');
    res.status(200).json({ success: true });
  }

  async addToReadingHistory(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const command = new AddToReadingHistoryCommand(userId, req.body.articleId, req.ip ?? '');
    await this.addToReadingHistoryHandler.handle(command);
    this.track('add_to_reading_history');
    res.status(200).json({ success: true });
  }

  async updateReadingProgress(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const command = new UpdateReadingProgressCommand(userId, req.body.articleId, req.body.progress, req.ip ?? '');
    await this.updateReadingProgressHandler.handle(command);
    this.track('update_reading_progress');
    res.status(200).json({ success: true });
  }

  async getBookmarks(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const query = new GetBookmarksQuery(userId);
    const bookmarks = await this.getBookmarksQueryHandler.handle(query);
    this.track('get_bookmarks');
    res.status(200).json(bookmarks);
  }

  async getReadingHistory(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const query = new GetReadingHistoryQuery(userId);
    const history = await this.getReadingHistoryQueryHandler.handle(query);
    this.track('get_reading_history');
    res.status(200).json(history);
  }
}
