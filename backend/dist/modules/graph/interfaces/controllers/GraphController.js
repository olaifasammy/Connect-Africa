"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphController = void 0;
const CreateGraphNodeCommand_1 = require("../../application/commands/CreateGraphNodeCommand");
const CreateGraphEdgeCommand_1 = require("../../application/commands/CreateGraphEdgeCommand");
const GetNodeQuery_1 = require("../../application/queries/GetNodeQuery");
const SearchGraphQuery_1 = require("../../application/queries/SearchGraphQuery");
const FindShortestPathQuery_1 = require("../../application/queries/FindShortestPathQuery");
class GraphController {
    createNodeHandler;
    createEdgeHandler;
    getNodeHandler;
    searchGraphHandler;
    findShortestPathHandler;
    constructor(createNodeHandler, createEdgeHandler, getNodeHandler, searchGraphHandler, findShortestPathHandler) {
        this.createNodeHandler = createNodeHandler;
        this.createEdgeHandler = createEdgeHandler;
        this.getNodeHandler = getNodeHandler;
        this.searchGraphHandler = searchGraphHandler;
        this.findShortestPathHandler = findShortestPathHandler;
    }
    async createNode(req, res) {
        const command = new CreateGraphNodeCommand_1.CreateGraphNodeCommand(req.body.entityId, req.body.type, req.body.metadata);
        await this.createNodeHandler.handle(command, req.user?.id || 'anonymous', req.ip || '');
        res.status(201).send();
    }
    async createEdge(req, res) {
        const command = new CreateGraphEdgeCommand_1.CreateGraphEdgeCommand(req.body.sourceEntityId, req.body.targetEntityId, req.body.relationshipType);
        await this.createEdgeHandler.handle(command, req.user?.id || 'anonymous', req.ip || '');
        res.status(201).send();
    }
    async getNode(req, res) {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const query = new GetNodeQuery_1.GetNodeQuery(id);
        const node = await this.getNodeHandler.handle(query);
        if (!node) {
            res.status(404).send();
            return;
        }
        res.json(node);
    }
    async search(req, res) {
        const label = String(req.query.label || '');
        const query = new SearchGraphQuery_1.SearchGraphQuery(label);
        const nodes = await this.searchGraphHandler.handle(query);
        res.json(nodes);
    }
    async shortestPath(req, res) {
        const start = String(req.query.start || '');
        const end = String(req.query.end || '');
        const query = new FindShortestPathQuery_1.FindShortestPathQuery(start, end);
        const path = await this.findShortestPathHandler.handle(query);
        res.json(path);
    }
}
exports.GraphController = GraphController;
//# sourceMappingURL=GraphController.js.map