import { Request, Response } from 'express';
import { CreateSourceHandler } from '../../application/handlers/CreateSourceHandler';
import { UpdateSourceHandler, DeleteSourceHandler } from '../../application/handlers/SourceCommandHandlers';
import { GetSourceHandler } from '../../application/handlers/SourceQueryHandlers';
import { CreateSourceCommand } from '../../application/commands/CreateSourceCommand';
import { UpdateSourceCommand, DeleteSourceCommand } from '../../application/commands/SourceCommands';
import { GetSourceQuery } from '../../application/queries/SourceQueries';
import { SourceId, SourceType, Provenance } from '../../domain/value-objects/SourceValueObjects';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';

export class SourceController {
  constructor(
    private readonly createSourceHandler: CreateSourceHandler,
    private readonly updateSourceHandler: UpdateSourceHandler,
    private readonly deleteSourceHandler: DeleteSourceHandler,
    private readonly getSourceHandler: GetSourceHandler,
    private readonly metrics: IMetricsProvider
  ) {}

  private track(action: string) {
    this.metrics.incrementCounter('source_operations_total', { action });
  }

  async create(req: Request, res: Response): Promise<void> {
    const { title, type, author, publishedAt, url, publisher } = req.body;
    const command = new CreateSourceCommand(
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

  async update(req: Request, res: Response): Promise<void> {
    // Implementation needed
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
