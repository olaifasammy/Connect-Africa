import { CreateEntityCommandHandler } from '@modules/entity/application/handlers/CreateEntityCommandHandler';
import { CreateEntityCommand } from '@modules/entity/application/commands/CreateEntityCommand';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { PostgresAuditRepository } from '@modules/audit/infrastructure/audit/PostgresAuditRepository';
import { EventBus } from '@infrastructure/queue/EventBus';

describe('CreateEntityCommandHandler', () => {
  let handler: CreateEntityCommandHandler;
  let entityRepository: IEntityRepository;
  let auditRepository: PostgresAuditRepository;
  let eventBus: EventBus;

  beforeEach(() => {
    entityRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      delete: jest.fn(),
    } as any;
    auditRepository = {
      log: jest.fn(),
    } as any;
    eventBus = {
      publish: jest.fn(),
    } as any;

    handler = new CreateEntityCommandHandler(entityRepository, auditRepository, eventBus);
  });

  it('should create a new entity', async () => {
    const command: CreateEntityCommand = {
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
