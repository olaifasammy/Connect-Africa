"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueOntologyPolicy_1 = require("@modules/ontology/domain/policies/UniqueOntologyPolicy");
const DomainError_1 = require("@modules/ontology/domain/errors/DomainError");
describe('UniqueOntologyPolicy', () => {
    let mockRepository;
    let policy;
    beforeEach(() => {
        mockRepository = {
            exists: jest.fn(),
            save: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            findAll: jest.fn()
        };
        policy = new UniqueOntologyPolicy_1.UniqueOntologyPolicy(mockRepository);
    });
    it('should not throw if ontology name is unique', async () => {
        mockRepository.exists.mockResolvedValue(false);
        await expect(policy.validate('New Ontology')).resolves.not.toThrow();
    });
    it('should throw DomainError if ontology name exists', async () => {
        mockRepository.exists.mockResolvedValue(true);
        await expect(policy.validate('Existing Ontology')).rejects.toThrow(DomainError_1.DomainError);
    });
});
//# sourceMappingURL=UniqueOntologyPolicy.spec.js.map