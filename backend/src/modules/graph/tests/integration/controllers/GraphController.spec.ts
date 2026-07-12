import request from 'supertest';
import express, { Express, Request, Response, NextFunction } from 'express';
import { GraphController } from '@modules/graph/interfaces/controllers/GraphController';
import { graphRoutes } from '@modules/graph/interfaces/routes/GraphRoutes';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';

describe('GraphController Integration', () => {
  let app: Express;
  let mockAuthMiddleware: Partial<AuthenticationMiddleware>;

  beforeAll(() => {
    app = express();
    app.use(express.json());

    mockAuthMiddleware = {
      authenticate: async (req: Request, res: Response, next: NextFunction) => {
        (req as any).user = { id: 'test-user-id', role: { hasPermission: () => true } };
        next();
        return undefined;
      }
    } as any;

    const mockController = {
        createNode: jest.fn().mockImplementation((req, res) => res.status(201).send()),
        createEdge: jest.fn().mockImplementation((req, res) => res.status(201).send()),
        getNode: jest.fn().mockImplementation((req, res) => res.json({})),
        search: jest.fn().mockImplementation((req, res) => res.json([])),
        shortestPath: jest.fn().mockImplementation((req, res) => res.json([]))
    } as unknown as GraphController;

    app.use('/graph', graphRoutes(mockController, mockAuthMiddleware as AuthenticationMiddleware));
  });

  it('should POST /graph/nodes', async () => {
    const response = await request(app)
      .post('/graph/nodes')
      .send({ entityId: 'n1', type: 'person' });
    expect(response.status).toBe(201);
  });
});
