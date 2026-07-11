"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Source_1 = require("../../../../source/domain/entities/Source");
const SourceValueObjects_1 = require("../../../../source/domain/value-objects/SourceValueObjects");
describe('Source Aggregate', () => {
    it('should create a new source', () => {
        const props = {
            title: 'Test Source',
            type: SourceValueObjects_1.SourceType.WEB,
            provenance: new SourceValueObjects_1.Provenance('Author', new Date()),
            createdAt: new Date(),
        };
        const source = Source_1.Source.create(props);
        expect(source.title).toBe('Test Source');
        expect(source.type).toBe(SourceValueObjects_1.SourceType.WEB);
    });
});
//# sourceMappingURL=Source.spec.js.map