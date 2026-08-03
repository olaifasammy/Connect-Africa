import { Request, Response } from 'express';
import { CreateGraphNodeHandler } from '../../application/handlers/CreateGraphNodeHandler';
import { CreateGraphEdgeHandler } from '../../application/handlers/CreateGraphEdgeHandler';
import { GetNodeHandler } from '../../application/handlers/GetNodeHandler';
import { SearchGraphHandler } from '../../application/handlers/SearchGraphHandler';
import { FindShortestPathHandler } from '../../application/handlers/FindShortestPathHandler';
import { CreateGraphNodeCommand } from '../../application/commands/CreateGraphNodeCommand';
import { CreateGraphEdgeCommand } from '../../application/commands/CreateGraphEdgeCommand';
import { GetNodeQuery } from '../../application/queries/GetNodeQuery';
import { SearchGraphQuery } from '../../application/queries/SearchGraphQuery';
import { FindShortestPathQuery } from '../../application/queries/FindShortestPathQuery';

export class GraphController {
  constructor(
    private readonly createNodeHandler: CreateGraphNodeHandler,
    private readonly createEdgeHandler: CreateGraphEdgeHandler,
    private readonly getNodeHandler: GetNodeHandler,
    private readonly searchGraphHandler: SearchGraphHandler,
    private readonly findShortestPathHandler: FindShortestPathHandler
  ) {}

  async createNode(req: Request, res: Response): Promise<void> {
    const command = new CreateGraphNodeCommand(req.body.entityId, req.body.type, req.body.metadata);
    await this.createNodeHandler.handle(command, req.user?.id || 'anonymous', req.ip || '');
    res.status(201).send();
  }

  async createEdge(req: Request, res: Response): Promise<void> {
    const command = new CreateGraphEdgeCommand(
      req.body.sourceEntityId,
      req.body.targetEntityId,
      req.body.relationshipType
    );
    await this.createEdgeHandler.handle(command, req.user?.id || 'anonymous', req.ip || '');
    res.status(201).send();
  }

  async getNode(req: Request, res: Response): Promise<void> {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const query = new GetNodeQuery(id);
    const node = await this.getNodeHandler.handle(query);
    if (!node) {
        res.status(404).send();
        return;
    }
    res.json(node);
  }

  async search(req: Request, res: Response): Promise<void> {
    const label = String(req.query.label || '');
    const query = new SearchGraphQuery(label);
    const nodes = await this.searchGraphHandler.handle(query);
    res.json(nodes);
  }

  async shortestPath(req: Request, res: Response): Promise<void> {
    const start = String(req.query.start || '');
    const end = String(req.query.end || '');
    const query = new FindShortestPathQuery(start, end);
    const path = await this.findShortestPathHandler.handle(query);
    res.json(path);
  }
}
