"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = require("../../../modules/auth/interfaces/http/routes/v1/authRoutes");
const ontologyRoutes_1 = require("../../../modules/ontology/interfaces/http/routes/v1/ontologyRoutes");
const RelationshipRoutes_1 = require("../../../modules/relationship/interfaces/routes/RelationshipRoutes");
const healthRoutes_1 = require("../../interfaces/http/routes/health/healthRoutes");
const container_1 = require("../../../bootstrap/container/container");
const AuthController_1 = require("../../../modules/auth/interfaces/AuthController");
const OntologyController_1 = require("../../../modules/ontology/interfaces/controllers/OntologyController");
const RelationshipController_1 = require("../../../modules/relationship/interfaces/controllers/RelationshipController");
const AuthenticationMiddleware_1 = require("../../interfaces/http/middleware/AuthenticationMiddleware");
const GraphRoutes_1 = require("../../../modules/graph/interfaces/routes/GraphRoutes");
const GraphController_1 = require("../../../modules/graph/interfaces/controllers/GraphController");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    // Routes
    app.use('/health', (0, healthRoutes_1.healthRoutes)());
    // Auth
    const authController = container_1.container.get(AuthController_1.AuthController);
    const authMiddleware = container_1.container.get(AuthenticationMiddleware_1.AuthenticationMiddleware);
    app.use('/api/v1/auth', (0, authRoutes_1.authRoutes)(authController, authMiddleware));
    // Ontology
    const ontologyController = container_1.container.get(OntologyController_1.OntologyController);
    app.use('/api/v1/ontology', (0, ontologyRoutes_1.ontologyRoutes)(ontologyController));
    // Relationship
    const relationshipController = container_1.container.get(RelationshipController_1.RelationshipController);
    app.use('/api/v1/relationship', (0, RelationshipRoutes_1.relationshipRoutes)(relationshipController, authMiddleware));
    // Graph
    const graphController = container_1.container.get(GraphController_1.GraphController);
    app.use('/graph', (0, GraphRoutes_1.graphRoutes)(graphController, authMiddleware));
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map