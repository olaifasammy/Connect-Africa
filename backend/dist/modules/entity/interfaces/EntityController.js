"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityController = void 0;
const CreateEntityRequest_1 = require("../../entity/application/dto/CreateEntityRequest");
const UpdateEntityRequest_1 = require("../../entity/application/dto/UpdateEntityRequest");
class EntityController {
    createHandler;
    updateHandler;
    deleteHandler;
    publishHandler;
    archiveHandler;
    restoreHandler;
    mergeHandler;
    addAliasHandler;
    removeAliasHandler;
    createVersionHandler;
    constructor(createHandler, updateHandler, deleteHandler, publishHandler, archiveHandler, restoreHandler, mergeHandler, addAliasHandler, removeAliasHandler, createVersionHandler) {
        this.createHandler = createHandler;
        this.updateHandler = updateHandler;
        this.deleteHandler = deleteHandler;
        this.publishHandler = publishHandler;
        this.archiveHandler = archiveHandler;
        this.restoreHandler = restoreHandler;
        this.mergeHandler = mergeHandler;
        this.addAliasHandler = addAliasHandler;
        this.removeAliasHandler = removeAliasHandler;
        this.createVersionHandler = createVersionHandler;
    }
    async create(req, res) {
        const userId = req.user?.id;
        const validationResult = CreateEntityRequest_1.CreateEntitySchema.safeParse(req.body);
        if (!validationResult.success) {
            res.status(400).json({ success: false, errors: validationResult.error.issues });
            return;
        }
        await this.createHandler.handle({ dto: validationResult.data, userId: userId });
        res.status(201).json({ success: true });
    }
    async update(req, res) {
        const userId = req.user?.id;
        const id = req.params.id;
        const validationResult = UpdateEntityRequest_1.UpdateEntitySchema.safeParse(req.body);
        if (!validationResult.success) {
            res.status(400).json({ success: false, errors: validationResult.error.issues });
            return;
        }
        await this.updateHandler.handle({ entityId: id, dto: validationResult.data, userId: userId });
        res.status(200).json({ success: true });
    }
    async delete(req, res) {
        const userId = req.user?.id;
        const id = req.params.id;
        await this.deleteHandler.handle({ entityId: id, userId: userId });
        res.status(204).send();
    }
    async publish(req, res) {
        const userId = req.user?.id;
        const id = req.params.id;
        await this.publishHandler.handle({ entityId: id, userId: userId });
        res.status(200).json({ success: true });
    }
    async archive(req, res) {
        const userId = req.user?.id;
        const id = req.params.id;
        await this.archiveHandler.handle({ entityId: id, userId: userId });
        res.status(200).json({ success: true });
    }
    async restore(req, res) {
        const userId = req.user?.id;
        const id = req.params.id;
        await this.restoreHandler.handle({ entityId: id, userId: userId });
        res.status(200).json({ success: true });
    }
    async merge(req, res) {
        const userId = req.user?.id;
        const sourceId = req.body.sourceId;
        const targetId = req.body.targetId;
        await this.mergeHandler.handle({ sourceEntityId: sourceId, targetEntityId: targetId, userId: userId });
        res.status(200).json({ success: true });
    }
    async addAlias(req, res) {
        const userId = req.user?.id;
        const id = req.params.id;
        const alias = req.body.alias;
        await this.addAliasHandler.handle({ entityId: id, alias, userId: userId });
        res.status(200).json({ success: true });
    }
    async removeAlias(req, res) {
        const userId = req.user?.id;
        const id = req.params.id;
        const alias = req.body.alias;
        await this.removeAliasHandler.handle({ entityId: id, alias, userId: userId });
        res.status(200).json({ success: true });
    }
    async createVersion(req, res) {
        const userId = req.user?.id;
        const id = req.params.id;
        await this.createVersionHandler.handle({ entityId: id, userId: userId });
        res.status(201).json({ success: true });
    }
}
exports.EntityController = EntityController;
//# sourceMappingURL=EntityController.js.map