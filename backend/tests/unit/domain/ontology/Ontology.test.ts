import { Ontology } from '@modules/ontology/domain/entities/Ontology';
import { DomainError } from '@modules/ontology/domain/errors/DomainError';

describe('Ontology', () => {
  it('should create a valid ontology', () => {
    const props = {
      name: 'Test Ontology',
      description: 'A test ontology',
      version: 1,
    };
    const ontology = Ontology.create(props);
    
    expect(ontology.name).toBe(props.name);
    expect(ontology.id).toBeDefined();
    expect(ontology.domainEvents.length).toBe(1);
  });

  it('should throw DomainError when name is empty', () => {
    const props = {
      name: '',
      description: 'Invalid',
      version: 1,
    };
    expect(() => Ontology.create(props)).toThrow(DomainError);
  });

  it('should throw DomainError when version is less than 1', () => {
    const props = {
      name: 'Test',
      description: 'Invalid',
      version: 0,
    };
    expect(() => Ontology.create(props)).toThrow(DomainError);
  });
});
