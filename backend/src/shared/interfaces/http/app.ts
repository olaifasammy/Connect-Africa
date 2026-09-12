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

import { EntityController } from '@modules/entity/interfaces/EntityController';
import { createEntityRoutes } from '@modules/entity/interfaces/EntityRoutes';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';

import { graphRoutes } from '@modules/graph/interfaces/routes/GraphRoutes';
import { GraphController } from '@modules/graph/interfaces/controllers/GraphController';

import { AiController } from '@modules/ai/interfaces/controllers/AiController';
import { createAiRoutes } from '@modules/ai/interfaces/routes/AiRoutes';
import { PromptController } from '@modules/ai/interfaces/controllers/PromptController';
import { ProviderController } from '@modules/ai/interfaces/controllers/ProviderController';
import { CrawlController } from '@modules/ai/interfaces/controllers/CrawlController';
import { KnowledgeGapController } from '@modules/ai/interfaces/controllers/KnowledgeGapController';
import { createPromptRoutes } from '@modules/ai/interfaces/routes/PromptRoutes';
import { createProviderRoutes } from '@modules/ai/interfaces/routes/ProviderRoutes';
import { createCrawlRoutes } from '@modules/ai/interfaces/routes/CrawlRoutes';
import { createKnowledgeGapRoutes } from '@modules/ai/interfaces/routes/KnowledgeGapRoutes';

import { createSearchRoutes } from '@modules/search/interfaces/routes/SearchRoutes';
import { SearchController } from '@modules/search/interfaces/controllers/SearchController';
import { AutocompleteController } from '@modules/search/interfaces/controllers/AutocompleteController';

import { createAuditRoutes } from '@modules/audit/interfaces/routes/AuditRoutes';
import { AuditController } from '@modules/audit/interfaces/controllers/AuditController';

import { NotificationController } from '@modules/notification/interfaces/http/NotificationController';
import { createNotificationRoutes } from '@modules/notification/interfaces/http/NotificationRoutes';

import { AnalyticsController } from '@modules/analytics/interfaces/http/AnalyticsController';
import { createAnalyticsRoutes } from '@modules/analytics/interfaces/http/AnalyticsRoutes';

export const createApp = (): Application => {
  const app = express();

  app.use(helmet());
  app.use(cors()); // Production CORS configuration belongs in shared/config hardening.
  app.use(express.json());
  app.use(cookieParser());

  // Health
  app.use('/health', healthRoutes());

  // Shared authentication middleware
  const authMiddleware = container.get(AuthenticationMiddleware);

  // Auth
  const authController = container.get(AuthController);

  app.use(
    '/api/v1/auth',
    authRateLimiter,
    authRoutes(authController, authMiddleware),
  );

  // Ontology
  const ontologyController = container.get(OntologyController);

  app.use(
    '/api/v1/ontology',
    ontologyRoutes(ontologyController, authMiddleware),
  );

  // Relationship
  const relationshipController = container.get(RelationshipController);

  app.use(
    '/api/v1/relationship',
    relationshipRoutes(relationshipController, authMiddleware),
  );

  // Entity
  const entityController = container.get(EntityController);
  const metricsProvider = container.get<IMetricsProvider>('IMetricsProvider');

  app.use(
    '/api/v1/entity',
    createEntityRoutes(
      entityController,
      authMiddleware,
      metricsProvider,
    ),
  );

  // Graph
  const graphController = container.get(GraphController);

  app.use(
    '/graph',
    graphRoutes(graphController, authMiddleware),
  );

  // AI
  const aiController = container.get(AiController);

  app.use(
    '/api/v1/ai',
    createAiRoutes(aiController, authMiddleware),
  );

  const promptController = container.get(PromptController);

  app.use(
    '/api/v1/ai/prompt',
    createPromptRoutes(promptController, authMiddleware),
  );

  const providerController = container.get(ProviderController);

  app.use(
    '/api/v1/ai/provider',
    createProviderRoutes(providerController, authMiddleware),
  );

  const crawlController = container.get(CrawlController);

  app.use(
    '/api/v1/ai/crawl',
    createCrawlRoutes(crawlController, authMiddleware),
  );

  const knowledgeGapController = container.get(KnowledgeGapController);

  app.use(
    '/api/v1/ai/knowledge-gap',
    createKnowledgeGapRoutes(
      knowledgeGapController,
      authMiddleware,
    ),
  );

  // Search
  const searchController = container.get(SearchController);
  const autocompleteController = container.get(AutocompleteController);

  app.use(
    '/api/search',
    createSearchRoutes(
      searchController,
      autocompleteController,
      authMiddleware,
    ),
  );

  // Audit
  const auditController = container.get(AuditController);

  app.use(
    '/api/v1/audit',
    createAuditRoutes(auditController, authMiddleware),
  );

  // Notification
  const notificationController = container.get(NotificationController);

  app.use(
    '/api/v1/notification',
    createNotificationRoutes(
      notificationController,
      authMiddleware,
    ),
  );

  // Analytics
  const analyticsController = container.get(AnalyticsController);

  app.use(
    '/api/v1/analytics',
    createAnalyticsRoutes(
      analyticsController,
      authMiddleware,
    ),
  );

  return app;
};