import { CreateSourceHandler } from '@modules/source/application/handlers/CreateSourceHandler';
import { ISourceRepository } from '@modules/source/domain/repositories/ISourceRepository';
import { IAuditLogger } from '@modules/source/domain/interfaces/SourceServices';
import { CreateSourceCommand } from '@modules/source/application/commands/CreateSourceCommand';
import { SourceType, Provenance } from '@modules/source/domain/value-objects/SourceValueObjects';

describe('CreateSourceHandler', () => {
  it('should create a new source', async () => {
    const mockRepo: jest.Mocked<ISourceRepository> = {
      save: jest.fn().mockResolvedValue(undefined),
      findById: jest.fn(),
      delete: jest.fn(),
    };
    const mockAuditLogger: jest.Mocked<IAuditLogger> = {
      log: jest.fn().mockResolvedValue(undefined),
    };

    const handler = new CreateSourceHandler(mockRepo, mockAuditLogger);
    const command = new CreateSourceCommand(
      'Test Source',
      SourceType.WEB,
      new Provenance('Author', new Date())
    );

    const sourceId = await handler.handle(command);
    
    expect(sourceId).toBeDefined();
    expect(mockRepo.save).toHaveBeenCalled();
    expect(mockAuditLogger.log).toHaveBeenCalledWith('SOURCE_CREATED', expect.anything());
  });
});
