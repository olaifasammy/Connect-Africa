"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ontology_1 = require("@modules/ontology/domain/entities/Ontology");
const DomainError_1 = require("@modules/ontology/domain/errors/DomainError");
describe('Ontology', () => {
    it('should create a valid ontology', () => {
        const props = {
            name: 'Test Ontology',
            description: 'A test ontology',
            version: 1,
        };
        const ontology = Ontology_1.Ontology.create(props);
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
        expect(() => Ontology_1.Ontology.create(props)).toThrow(DomainError_1.DomainError);
    });
    it('should throw DomainError when version is less than 1', () => {
        const props = {
            name: 'Test',
            description: 'Invalid',
            version: 0,
        };
        expect(() => Ontology_1.Ontology.create(props)).toThrow(DomainError_1.DomainError);
    });
});
//# sourceMappingURL=Ontology.test.js.map