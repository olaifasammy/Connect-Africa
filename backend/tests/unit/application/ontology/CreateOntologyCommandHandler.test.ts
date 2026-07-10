import { CreateOntologyCommandHandler } from '@modules/ontology/application/handlers/CreateOntologyCommandHandler';
import { CreateOntologyCommand } from '@modules/ontology/application/commands/CreateOntologyCommand';
import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';
import { UniqueOntologyPolicy } from '@modules/ontology/domain/policies/UniqueOntologyPolicy';
import { Ontology } from '@modules/ontology/domain/entities/Ontology';

describe('CreateOntologyCommandHandler', () => {
  let handler: CreateOntologyCommandHandler;
  let service: any;

  beforeEach(() => {
    service = {
      create: jest.fn().mockResolvedValue({
        id: { toString: () => 'ontology-id' },
        name: 'Test Ontology',
      }),
    };
    
    handler = new CreateOntologyCommandHandler(service);
  });

  it('should create a new ontology', async () => {
    const command: CreateOntologyCommand = {
      name: 'Test Ontology',
      description: 'A test ontology',
      version: 1,
    };

    const result = await handler.handle(command);

    expect(result.name).toBe(command.name);
    expect(service.create).toHaveBeenCalled();
  });
});
