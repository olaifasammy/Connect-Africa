import { Request, Response } from 'express';
import { CreateGraphNodeHandler } from '../../application/handlers/CreateGraphNodeHandler';
import { CreateGraphEdgeHandler } from '../../application/handlers/CreateGraphEdgeHandler';
import { GetNodeHandler } from '../../application/handlers/GetNodeHandler';
import { SearchGraphHandler } from '../../application/handlers/SearchGraphHandler';
import { FindShortestPathHandler } from '../../application/handlers/FindShortestPathHandler';
export declare class GraphController {
    private readonly createNodeHandler;
    private readonly createEdgeHandler;
    private readonly getNodeHandler;
    private readonly searchGraphHandler;
    private readonly findShortestPathHandler;
    constructor(createNodeHandler: CreateGraphNodeHandler, createEdgeHandler: CreateGraphEdgeHandler, getNodeHandler: GetNodeHandler, searchGraphHandler: SearchGraphHandler, findShortestPathHandler: FindShortestPathHandler);
    createNode(req: Request, res: Response): Promise<void>;
    createEdge(req: Request, res: Response): Promise<void>;
    getNode(req: Request, res: Response): Promise<void>;
    search(req: Request, res: Response): Promise<void>;
    shortestPath(req: Request, res: Response): Promise<void>;
}
