"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const CreateArticleCommand_1 = require("../../application/commands/CreateArticleCommand");
const UpdateArticleCommand_1 = require("../../application/commands/UpdateArticleCommand");
const DeleteArticleCommand_1 = require("../../application/commands/DeleteArticleCommand");
const PublishArticleCommand_1 = require("../../application/commands/PublishArticleCommand");
const ArchiveArticleCommand_1 = require("../../application/commands/ArchiveArticleCommand");
const SubmitForReviewCommand_1 = require("../../application/commands/SubmitForReviewCommand");
const ApproveArticleCommand_1 = require("../../application/commands/ApproveArticleCommand");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class ArticleController {
    createArticleHandler;
    updateArticleHandler;
    deleteArticleHandler;
    publishArticleHandler;
    archiveArticleHandler;
    submitForReviewHandler;
    approveArticleHandler;
    metrics;
    constructor(createArticleHandler, updateArticleHandler, deleteArticleHandler, publishArticleHandler, archiveArticleHandler, submitForReviewHandler, approveArticleHandler, metrics) {
        this.createArticleHandler = createArticleHandler;
        this.updateArticleHandler = updateArticleHandler;
        this.deleteArticleHandler = deleteArticleHandler;
        this.publishArticleHandler = publishArticleHandler;
        this.archiveArticleHandler = archiveArticleHandler;
        this.submitForReviewHandler = submitForReviewHandler;
        this.approveArticleHandler = approveArticleHandler;
        this.metrics = metrics;
    }
    track(action) {
        this.metrics.incrementCounter('article_operations_total', { action });
    }
    async create(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            return;
        }
        const { title, summary, content } = req.body;
        const command = new CreateArticleCommand_1.CreateArticleCommand(title, summary, content, new UniqueEntityId_1.UniqueEntityId(userId));
        const articleId = await this.createArticleHandler.handle(command);
        this.track('create');
        res.status(201).json({ id: articleId });
    }
    async update(req, res) {
        const { title, summary, content } = req.body;
        const command = new UpdateArticleCommand_1.UpdateArticleCommand(new UniqueEntityId_1.UniqueEntityId(req.params.id), title, summary, content);
        await this.updateArticleHandler.handle(command);
        this.track('update');
        res.status(200).json({ success: true });
    }
    async delete(req, res) {
        const command = new DeleteArticleCommand_1.DeleteArticleCommand(new UniqueEntityId_1.UniqueEntityId(req.params.id));
        await this.deleteArticleHandler.handle(command);
        this.track('delete');
        res.status(204).send();
    }
    async publish(req, res) {
        const command = new PublishArticleCommand_1.PublishArticleCommand(new UniqueEntityId_1.UniqueEntityId(req.params.id));
        await this.publishArticleHandler.handle(command);
        this.track('publish');
        res.status(200).json({ success: true });
    }
    async archive(req, res) {
        const command = new ArchiveArticleCommand_1.ArchiveArticleCommand(new UniqueEntityId_1.UniqueEntityId(req.params.id));
        await this.archiveArticleHandler.handle(command);
        this.track('archive');
        res.status(200).json({ success: true });
    }
    async submitForReview(req, res) {
        const command = new SubmitForReviewCommand_1.SubmitForReviewCommand(new UniqueEntityId_1.UniqueEntityId(req.params.id));
        await this.submitForReviewHandler.handle(command);
        this.track('submit_for_review');
        res.status(200).json({ success: true });
    }
    async approve(req, res) {
        const command = new ApproveArticleCommand_1.ApproveArticleCommand(new UniqueEntityId_1.UniqueEntityId(req.params.id));
        await this.approveArticleHandler.handle(command);
        this.track('approve');
        res.status(200).json({ success: true });
    }
}
exports.ArticleController = ArticleController;
//# sourceMappingURL=ArticleController.js.map