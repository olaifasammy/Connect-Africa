"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OntologyValidator_1 = require("@modules/ontology/domain/validators/OntologyValidator");
const OntologyValidator_2 = require("@modules/ontology/domain/validators/OntologyValidator");
describe('OntologyValidator', () => {
    it('should not throw error if props are valid', () => {
        expect(() => OntologyValidator_1.OntologyValidator.validate({ name: 'Valid', description: 'Valid' })).not.toThrow();
    });
    it('should throw error if name is empty', () => {
        expect(() => OntologyValidator_1.OntologyValidator.validate({ name: '', description: 'Valid' })).toThrow(OntologyValidator_2.OntologyValidationError);
    });
    it('should throw error if description is empty', () => {
        expect(() => OntologyValidator_1.OntologyValidator.validate({ name: 'Valid', description: '' })).toThrow(OntologyValidator_2.OntologyValidationError);
    });
});
//# sourceMappingURL=OntologyValidator.spec.js.map