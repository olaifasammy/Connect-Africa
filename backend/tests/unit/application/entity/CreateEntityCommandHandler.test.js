"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateEntityCommandHandler_1 = require("@modules/entity/application/handlers/CreateEntityCommandHandler");
describe('CreateEntityCommandHandler', () => {
    let handler;
    let entityRepository;
    let auditRepository;
    let eventBus;
    beforeEach(() => {
        entityRepository = {
            save: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            delete: jest.fn(),
        };
        auditRepository = {
            log: jest.fn(),
        };
        eventBus = {
            publish: jest.fn(),
        };
        handler = new CreateEntityCommandHandler_1.CreateEntityCommandHandler(entityRepository, auditRepository, eventBus);
    });
    it('should create a new entity', async () => {
        const command = {
            dto: {
                name: 'Test Entity',
                type: 'Person',
                description: 'Test description',
            },
            userId: 'user-123'
        };
        await handler.handle(command);
        expect(entityRepository.save).toHaveBeenCalled();
        expect(auditRepository.log).toHaveBeenCalled();
        expect(eventBus.publish).toHaveBeenCalled();
    });
});
//# sourceMappingURL=CreateEntityCommandHandler.test.js.map