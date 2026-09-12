import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { CreateSourceHandler } from '../../application/handlers/CreateSourceHandler';
import { UpdateSourceHandler, DeleteSourceHandler } from '../../application/handlers/SourceCommandHandlers';
import { GetSourceHandler, ListSourcesHandler } from '../../application/handlers/SourceQueryHandlers';
import { CreateSourceCommand } from '../../application/commands/CreateSourceCommand';
import { UpdateSourceCommand, DeleteSourceCommand } from '../../application/commands/SourceCommands';
import { GetSourceQuery, ListSourcesQuery } from '../../application/queries/SourceQueries';
import { SourceId, SourceType, Provenance } from '../../domain/value-objects/SourceValueObjects';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';

@provide(SourceController, true)
@injectable()
export class SourceController {
  constructor(
    private readonly createSourceHandler: CreateSourceHandler,
    private readonly updateSourceHandler: UpdateSourceHandler,
    private readonly deleteSourceHandler: DeleteSourceHandler,
    private readonly getSourceHandler: GetSourceHandler,
    private readonly listSourcesHandler: ListSourcesHandler,
    @inject('IMetricsProvider') private readonly metrics: IMetricsProvider
  ) {}

  private track(action: string) {
    this.metrics.incrementCounter('source_operations_total', { action });
  }

  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
    }
    const { title, type, author, publishedAt, url, publisher } = req.body;
    const command = new CreateSourceCommand(
      userId,
      title,
      type as SourceType,
      new Provenance(author, new Date(publishedAt), url, publisher)
    );
    const sourceId = await this.createSourceHandler.handle(command);
    this.track('create');
    res.status(201).json({ id: sourceId });
  }

  async get(req: Request, res: Response): Promise<void> {
    const query = new GetSourceQuery(new SourceId(req.params.id as string));
    const source = await this.getSourceHandler.handle(query);
    if (!source) {
      res.status(404).send();
      return;
    }
    this.track('get');
    res.json(source);
  }

  async list(req: Request, res: Response): Promise<void> {
    const query = new ListSourcesQuery();
    const sources = await this.listSourcesHandler.handle(query);
    this.track('list');
    res.json(sources);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { title, author, publishedAt, url, publisher } = req.body;
    const command = new UpdateSourceCommand(
      new SourceId(req.params.id as string),
      title,
      author,
      publishedAt ? new Date(publishedAt) : undefined,
      url,
      publisher
    );
    await this.updateSourceHandler.handle(command);
    this.track('update');
    res.status(200).json({ success: true });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const command = new DeleteSourceCommand(new SourceId(req.params.id as string));
    await this.deleteSourceHandler.handle(command);
    this.track('delete');
    res.status(204).send();
  }
}
