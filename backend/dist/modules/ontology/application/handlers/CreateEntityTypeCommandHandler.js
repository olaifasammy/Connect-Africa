"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEntityTypeCommandHandler = void 0;
class CreateEntityTypeCommandHandler {
    entityTypeService;
    constructor(entityTypeService) {
        this.entityTypeService = entityTypeService;
    }
    async handle(command, userId, ipAddress) {
        await this.entityTypeService.createEntityType(command.ontologyId, { name: command.name, description: command.description }, userId, ipAddress);
    }
}
exports.CreateEntityTypeCommandHandler = CreateEntityTypeCommandHandler;
//# sourceMappingURL=CreateEntityTypeCommandHandler.js.map