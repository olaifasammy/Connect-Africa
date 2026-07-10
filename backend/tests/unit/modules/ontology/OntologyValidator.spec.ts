import { OntologyValidator } from '@modules/ontology/domain/validators/OntologyValidator';
import { OntologyValidationError } from '@modules/ontology/domain/validators/OntologyValidator';

describe('OntologyValidator', () => {
  it('should not throw error if props are valid', () => {
    expect(() => OntologyValidator.validate({ name: 'Valid', description: 'Valid' })).not.toThrow();
  });

  it('should throw error if name is empty', () => {
    expect(() => OntologyValidator.validate({ name: '', description: 'Valid' })).toThrow(OntologyValidationError);
  });

  it('should throw error if description is empty', () => {
    expect(() => OntologyValidator.validate({ name: 'Valid', description: '' })).toThrow(OntologyValidationError);
  });
});
