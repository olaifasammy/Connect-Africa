import { CreateRelationshipHandler } from '@modules/relationship/application/handlers/CreateRelationshipHandler';
import { IRelationshipRepository } from '@modules/relationship/domain/repositories/IRelationshipRepository';
import { IOntologyService, IAuditLogger, IEventBus } from '@modules/relationship/domain/interfaces/RelationshipServices';
import { CreateRelationshipCommand } from '@modules/relationship/application/commands/RelationshipCommands';

describe('CreateRelationshipHandler', () => {
  let handler: CreateRelationshipHandler;
  let mockRepo: jest.Mocked<IRelationshipRepository>;
  let mockOntology: jest.Mocked<IOntologyService>;
  let mockAudit: jest.Mocked<IAuditLogger>;
  let mockEventBus: jest.Mocked<IEventBus>;

  beforeEach(() => {
    mockRepo = { save: jest.fn(), findById: jest.fn(), delete: jest.fn(), exists: jest.fn() };
    mockOntology = { validateRelationshipType: jest.fn() };
    mockAudit = { log: jest.fn() };
    mockEventBus = { publish: jest.fn() };
    
    handler = new CreateRelationshipHandler(mockRepo, mockOntology, mockAudit, mockEventBus);
  });

  it('should create relationship successfully', async () => {
    const command: CreateRelationshipCommand = {
      sourceEntityId: 'ent1',
      targetEntityId: 'ent2',
      relationshipTypeId: 'type1'
    };

    const result = await handler.handle(command);

    expect(mockOntology.validateRelationshipType).toHaveBeenCalledWith('type1');
    expect(mockRepo.save).toHaveBeenCalled();
    expect(mockAudit.log).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});
