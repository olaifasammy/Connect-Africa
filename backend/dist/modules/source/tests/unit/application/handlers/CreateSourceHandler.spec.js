"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateSourceHandler_1 = require("../../../../../source/application/handlers/CreateSourceHandler");
const CreateSourceCommand_1 = require("../../../../../source/application/commands/CreateSourceCommand");
const SourceValueObjects_1 = require("../../../../../source/domain/value-objects/SourceValueObjects");
describe('CreateSourceHandler', () => {
    it('should create a new source', async () => {
        const mockRepo = {
            save: jest.fn().mockResolvedValue(undefined),
            findById: jest.fn(),
            delete: jest.fn(),
        };
        const mockAuditLogger = {
            log: jest.fn().mockResolvedValue(undefined),
        };
        const handler = new CreateSourceHandler_1.CreateSourceHandler(mockRepo, mockAuditLogger);
        const command = new CreateSourceCommand_1.CreateSourceCommand('Test Source', SourceValueObjects_1.SourceType.WEB, new SourceValueObjects_1.Provenance('Author', new Date()));
        const sourceId = await handler.handle(command);
        expect(sourceId).toBeDefined();
        expect(mockRepo.save).toHaveBeenCalled();
        expect(mockAuditLogger.log).toHaveBeenCalledWith('SOURCE_CREATED', expect.anything());
    });
});
//# sourceMappingURL=CreateSourceHandler.spec.js.map