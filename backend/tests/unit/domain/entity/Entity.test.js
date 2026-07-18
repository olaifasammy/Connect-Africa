"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("@modules/entity/domain/entities/Entity");
const EntityId_1 = require("@modules/entity/domain/value-objects/EntityId");
const EntityName_1 = require("@modules/entity/domain/value-objects/EntityName");
const EntityMetadata_1 = require("@modules/entity/domain/value-objects/EntityMetadata");
const UniqueEntityId_1 = require("@shared/domain/UniqueEntityId");
describe('Entity Aggregate Root', () => {
    it('should create a valid entity', () => {
        const id = EntityId_1.EntityId.create(new UniqueEntityId_1.UniqueEntityId().toString());
        const name = EntityName_1.EntityName.create('Test Entity');
        const metadata = EntityMetadata_1.EntityMetadata.create({ tags: ['test'] });
        const type = 'Person';
        const entity = Entity_1.Entity.create(id, name, type, metadata);
        expect(entity.entityId).toEqual(id);
        expect(entity.name.value).toBe('Test Entity');
        expect(entity.type).toBe('Person');
    });
    it('should throw error for empty name', () => {
        expect(() => EntityName_1.EntityName.create('')).toThrow('Entity name cannot be empty');
    });
});
//# sourceMappingURL=Entity.test.js.map