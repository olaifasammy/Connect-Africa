import express, { Application } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authRateLimiter } from '@shared/interfaces/http/middleware/RateLimitMiddleware';
import { authRoutes } from '@modules/auth/interfaces/http/routes/v1/authRoutes';
import { ontologyRoutes } from '@modules/ontology/interfaces/http/routes/v1/ontologyRoutes';
import { relationshipRoutes } from '@modules/relationship/interfaces/routes/RelationshipRoutes';
import { healthRoutes } from '@shared/interfaces/http/routes/health/healthRoutes';
import { container } from '@bootstrap/container/container';
import { AuthController } from '@modules/auth/interfaces/AuthController';
import { OntologyController } from '@modules/ontology/interfaces/controllers/OntologyController';
import { RelationshipController } from '@modules/relationship/interfaces/controllers/RelationshipController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { graphRoutes } from '@modules/graph/interfaces/routes/GraphRoutes';
import { GraphController } from '@modules/graph/interfaces/controllers/GraphController';
import { AiController } from '@modules/ai/interfaces/controllers/AiController';
import { AiRoutes } from '@modules/ai/interfaces/routes/AiRoutes';
import { SearchRoutes } from '@modules/search/interfaces/routes/SearchRoutes';

export const createApp = (): Application => {
  const app = express();

  app.use(helmet());
  app.use(cors()); // Basic CORS, should be configured in production env
  app.use(express.json());
  app.use(cookieParser());

  // Routes
  app.use('/health', healthRoutes());
  
  // Auth
  const authController = container.get(AuthController);
  const authMiddleware = container.get(AuthenticationMiddleware);
  app.use('/api/v1/auth', authRateLimiter, authRoutes(authController, authMiddleware)); // Applied Rate Limiting

  // Ontology
  const ontologyController = container.get(OntologyController);
  app.use('/api/v1/ontology', ontologyRoutes(ontologyController));

  // Relationship
  const relationshipController = container.get(RelationshipController);
  app.use('/api/v1/relationship', relationshipRoutes(relationshipController, authMiddleware));

  // Graph
  const graphController = container.get(GraphController);
  app.use('/graph', graphRoutes(graphController, authMiddleware));

  // AI
  const aiController = container.get(AiController);
  app.use('/api/v1/ai', AiRoutes);

  // Search
  app.use('/api/search', SearchRoutes);

  return app;
};
