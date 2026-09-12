import {
  Request,
  Response,
} from 'express';

import { injectable } from 'inversify';

import { provide } from 'inversify-binding-decorators';

import { GetGraphMetricsHandler } from '../../application/handlers/GetGraphMetricsHandler';

import { GetNodeHandler } from '../../application/handlers/GetNodeHandler';

import { SearchGraphHandler } from '../../application/handlers/SearchGraphHandler';

import { FindShortestPathHandler } from '../../application/handlers/FindShortestPathHandler';

import { GetNodeQuery } from '../../application/queries/GetNodeQuery';

import { SearchGraphQuery } from '../../application/queries/SearchGraphQuery';

import { FindShortestPathQuery } from '../../application/queries/FindShortestPathQuery';

@provide(GraphController, true)
@injectable()
export class GraphController {
  constructor(
    private readonly getNodeHandler:
      GetNodeHandler,

    private readonly searchGraphHandler:
      SearchGraphHandler,

    private readonly findShortestPathHandler:
      FindShortestPathHandler,

    private readonly getGraphMetricsHandler:
      GetGraphMetricsHandler,
  ) {}

  async getNode(
    req: Request,
    res: Response,
  ): Promise<void> {
    const id =
      Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

    const query =
      new GetNodeQuery(id);

    const node =
      await this.getNodeHandler.handle(
        query,
      );

    if (!node) {
      res.status(404).send();
      return;
    }

    res.json(node);
  }

  async search(
    req: Request,
    res: Response,
  ): Promise<void> {
    const label =
      req.query.label !== undefined
        ? String(req.query.label)
        : undefined;

    const limit =
      req.query.limit !== undefined
        ? Number(req.query.limit)
        : 20;

    const offset =
      req.query.offset !== undefined
        ? Number(req.query.offset)
        : 0;

    const query =
      new SearchGraphQuery(
        label,
        limit,
        offset,
      );

    const nodes =
      await this.searchGraphHandler.handle(
        query,
      );

    res.json(nodes);
  }

  async shortestPath(
    req: Request,
    res: Response,
  ): Promise<void> {
    const start =
      String(req.query.start || '');

    const end =
      String(req.query.end || '');

    const query =
      new FindShortestPathQuery(
        start,
        end,
      );

    const path =
      await this.findShortestPathHandler.handle(
        query,
      );

    res.json(path);
  }

  async getMetrics(
    _req: Request,
    res: Response,
  ): Promise<void> {
    const metrics =
      await this.getGraphMetricsHandler.handle();

    res.json(metrics);
  }
}