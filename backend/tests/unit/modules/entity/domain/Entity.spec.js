"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../../../../../src/modules/entity/domain/entities/Entity");
const EntityId_1 = require("../../../../../src/modules/entity/domain/value-objects/EntityId");
const EntityName_1 = require("../../../../../src/modules/entity/domain/value-objects/EntityName");
const EntityMetadata_1 = require("../../../../../src/modules/entity/domain/value-objects/EntityMetadata");
const UniqueEntityId_1 = require("../../../../../src/shared/domain/UniqueEntityId");
describe('Entity Aggregate', () => {
    it('should create a valid entity', () => {
        const id = EntityId_1.EntityId.create(new UniqueEntityId_1.UniqueEntityId().toString());
        const name = EntityName_1.EntityName.create('Test Entity');
        const metadata = EntityMetadata_1.EntityMetadata.create({ tags: ['test'] });
        const entity = Entity_1.Entity.create(id, name, 'Type', metadata);
        expect(entity.name.value).toBe('Test Entity');
    });
});
//# sourceMappingURL=Entity.spec.js.map