import express, { Application } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { authRoutes } from '@modules/auth/interfaces/http/routes/v1/authRoutes';
import { ontologyRoutes } from '@modules/ontology/interfaces/http/routes/v1/ontologyRoutes';
import { relationshipRoutes } from '@modules/relationship/interfaces/routes/RelationshipRoutes';
import { healthRoutes } from '@shared/interfaces/http/routes/health/healthRoutes';
import { container } from '@bootstrap/container/container';
import { AuthController } from '@modules/auth/interfaces/AuthController';
import { OntologyController } from '@modules/ontology/interfaces/controllers/OntologyController';
import { RelationshipController } from '@modules/relationship/interfaces/controllers/RelationshipController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';

export const createApp = (): Application => {
  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());

  // Routes
  app.use('/health', healthRoutes());
  
  // Auth
  const authController = container.get(AuthController);
  const authMiddleware = container.get(AuthenticationMiddleware);
  app.use('/api/v1/auth', authRoutes(authController, authMiddleware));

  // Ontology
  const ontologyController = container.get(OntologyController);
  app.use('/api/v1/ontology', ontologyRoutes(ontologyController));

  // Relationship
  const relationshipController = container.get(RelationshipController);
  app.use('/api/v1/relationship', relationshipRoutes(relationshipController, authMiddleware));

  return app;
};
