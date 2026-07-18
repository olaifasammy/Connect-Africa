"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateOntologyCommandHandler_1 = require("@modules/ontology/application/handlers/CreateOntologyCommandHandler");
describe('CreateOntologyCommandHandler', () => {
    let handler;
    let service;
    beforeEach(() => {
        service = {
            create: jest.fn().mockResolvedValue({
                id: { toString: () => 'ontology-id' },
                name: 'Test Ontology',
            }),
        };
        handler = new CreateOntologyCommandHandler_1.CreateOntologyCommandHandler(service);
    });
    it('should create a new ontology', async () => {
        const command = {
            name: 'Test Ontology',
            description: 'A test ontology',
            version: 1,
        };
        const result = await handler.handle(command);
        expect(result.name).toBe(command.name);
        expect(service.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=CreateOntologyCommandHandler.test.js.map