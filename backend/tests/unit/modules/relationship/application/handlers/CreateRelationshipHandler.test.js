"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateRelationshipHandler_1 = require("@modules/relationship/application/handlers/CreateRelationshipHandler");
const RelationshipCommands_1 = require("@modules/relationship/application/commands/RelationshipCommands");
describe('CreateRelationshipHandler', () => {
    let handler;
    let mockRepo;
    let mockOntology;
    let mockAudit;
    let mockEventBus;
    beforeEach(() => {
        mockRepo = { save: jest.fn(), findById: jest.fn(), delete: jest.fn(), exists: jest.fn() };
        mockOntology = { validateRelationshipType: jest.fn() };
        mockAudit = { log: jest.fn() };
        mockEventBus = { publish: jest.fn() };
        handler = new CreateRelationshipHandler_1.CreateRelationshipHandler(mockRepo, mockOntology, mockAudit, mockEventBus);
    });
    it('should create relationship successfully', async () => {
        const command = new RelationshipCommands_1.CreateRelationshipCommand('ent1', 'ent2', 'type1', 'user1');
        const result = await handler.handle(command);
        expect(mockOntology.validateRelationshipType).toHaveBeenCalledWith('type1');
        expect(mockRepo.save).toHaveBeenCalled();
        expect(mockAudit.log).toHaveBeenCalled();
        expect(result).toBeDefined();
    });
});
//# sourceMappingURL=CreateRelationshipHandler.test.js.map