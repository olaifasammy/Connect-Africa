"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relationship = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const RelationshipCreatedEvent_1 = require("../events/RelationshipCreatedEvent");
/**
 * Relationship Aggregate Root.
 * Manages the lifecycle of a semantic relationship between two entities.
 */
class Relationship extends AggregateRoot_1.AggregateRoot {
    constructor(id, props) {
        super(props, id);
        this.validateInvariants();
    }
    get sourceEntityId() { return this.props.sourceEntityId; }
    get targetEntityId() { return this.props.targetEntityId; }
    get relationshipTypeId() { return this.props.relationshipTypeId; }
    get createdAt() { return this.props.createdAt; }
    /**
     * Validates core business invariants of a relationship.
     * @throws Error if invariants are violated.
     */
    validateInvariants() {
        if (this.props.sourceEntityId.equals(this.props.targetEntityId)) {
            throw new Error('Business Rule Violation: Source and target entity cannot be the same.');
        }
    }
    /**
     * Factory method to create a new Relationship.
     */
    static create(id, sourceEntityId, targetEntityId, relationshipTypeId) {
        const relationship = new Relationship(id, {
            sourceEntityId,
            targetEntityId,
            relationshipTypeId,
            createdAt: new Date()
        });
        relationship.addDomainEvent(new RelationshipCreatedEvent_1.RelationshipCreatedEvent(id.toString(), sourceEntityId.getProps().value, targetEntityId.getProps().value, relationshipTypeId.getProps().value));
        return relationship;
    }
    /**
     * Reconstructs an existing Relationship from persistent storage.
     */
    static reconstruct(id, sourceEntityId, targetEntityId, relationshipTypeId, createdAt) {
        return new Relationship(id, { sourceEntityId, targetEntityId, relationshipTypeId, createdAt });
    }
}
exports.Relationship = Relationship;
//# sourceMappingURL=Relationship.js.map