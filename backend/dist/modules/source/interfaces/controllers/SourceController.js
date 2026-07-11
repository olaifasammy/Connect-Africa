"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceController = void 0;
const CreateSourceCommand_1 = require("../../application/commands/CreateSourceCommand");
const SourceCommands_1 = require("../../application/commands/SourceCommands");
const SourceQueries_1 = require("../../application/queries/SourceQueries");
const SourceValueObjects_1 = require("../../domain/value-objects/SourceValueObjects");
class SourceController {
    createSourceHandler;
    updateSourceHandler;
    deleteSourceHandler;
    getSourceHandler;
    metrics;
    constructor(createSourceHandler, updateSourceHandler, deleteSourceHandler, getSourceHandler, metrics) {
        this.createSourceHandler = createSourceHandler;
        this.updateSourceHandler = updateSourceHandler;
        this.deleteSourceHandler = deleteSourceHandler;
        this.getSourceHandler = getSourceHandler;
        this.metrics = metrics;
    }
    track(action) {
        this.metrics.incrementCounter('source_operations_total', { action });
    }
    async create(req, res) {
        const { title, type, author, publishedAt, url, publisher } = req.body;
        const command = new CreateSourceCommand_1.CreateSourceCommand(title, type, new SourceValueObjects_1.Provenance(author, new Date(publishedAt), url, publisher));
        const sourceId = await this.createSourceHandler.handle(command);
        this.track('create');
        res.status(201).json({ id: sourceId });
    }
    async get(req, res) {
        const query = new SourceQueries_1.GetSourceQuery(new SourceValueObjects_1.SourceId(req.params.id));
        const source = await this.getSourceHandler.handle(query);
        if (!source) {
            res.status(404).send();
            return;
        }
        this.track('get');
        res.json(source);
    }
    async update(req, res) {
        // Implementation needed
        this.track('update');
        res.status(200).json({ success: true });
    }
    async delete(req, res) {
        const command = new SourceCommands_1.DeleteSourceCommand(new SourceValueObjects_1.SourceId(req.params.id));
        await this.deleteSourceHandler.handle(command);
        this.track('delete');
        res.status(204).send();
    }
}
exports.SourceController = SourceController;
//# sourceMappingURL=SourceController.js.map