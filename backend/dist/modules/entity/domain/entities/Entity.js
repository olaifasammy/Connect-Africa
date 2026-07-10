"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const EntityId_1 = require("../value-objects/EntityId");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const EntityCreatedEvent_1 = require("../events/EntityCreatedEvent");
/**
 * Entity Aggregate Root.
 * Manages the lifecycle and metadata of a core platform entity.
 */
class Entity extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
        this.validateInvariants();
    }
    /**
     * Validates business invariants.
     */
    validateInvariants() {
        if (!this.props.name) {
            throw new Error('Business Rule Violation: Entity name is required.');
        }
        if (!this.props.type || this.props.type.trim() === '') {
            throw new Error('Business Rule Violation: Entity type is required.');
        }
    }
    /**
     * Factory method to create a new Entity.
     */
    static create(id, name, type, metadata) {
        const entity = new Entity({
            name,
            type,
            metadata,
            createdAt: new Date(),
            updatedAt: new Date()
        }, new UniqueEntityId_1.UniqueEntityId(id.value));
        entity.addDomainEvent(new EntityCreatedEvent_1.EntityCreatedEvent(entity));
        return entity;
    }
    /**
     * Rehydrates an existing Entity from persistence.
     */
    static rehydrate(id, name, type, metadata, createdAt, updatedAt) {
        return new Entity({ name, type, metadata, createdAt, updatedAt }, id);
    }
    get entityId() {
        return EntityId_1.EntityId.create(this._id.toString());
    }
    get name() {
        return this.props.name;
    }
    get type() {
        return this.props.type;
    }
    get metadata() {
        return this.props.metadata;
    }
    /**
     * Merges another entity into this one.
     */
    merge(otherEntity) {
        // Basic merge implementation: transfer metadata and update timestamps
        this.props.metadata = this.props.metadata.merge(otherEntity.metadata);
        this.props.updatedAt = new Date();
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map