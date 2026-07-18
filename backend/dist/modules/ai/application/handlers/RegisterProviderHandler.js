"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterProviderHandler = void 0;
const Provider_1 = require("../../domain/entities/Provider");
class RegisterProviderHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command) {
        const provider = new Provider_1.Provider(Math.random().toString(), command.name, true, command.priority);
        await this.repository.save(provider);
    }
}
exports.RegisterProviderHandler = RegisterProviderHandler;
//# sourceMappingURL=RegisterProviderHandler.js.map