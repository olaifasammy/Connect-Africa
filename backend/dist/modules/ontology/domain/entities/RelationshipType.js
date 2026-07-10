"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipType = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const RelationshipTypeCreatedEvent_1 = require("../events/RelationshipTypeCreatedEvent");
const RelationshipTypeUpdatedEvent_1 = require("../events/RelationshipTypeUpdatedEvent");
const RelationshipTypeDeletedEvent_1 = require("../events/RelationshipTypeDeletedEvent");
class RelationshipType extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const relationshipType = new RelationshipType(props, id);
        if (!id) {
            relationshipType.addDomainEvent(new RelationshipTypeCreatedEvent_1.RelationshipTypeCreatedEvent(relationshipType.id));
        }
        return relationshipType;
    }
    update(name, description) {
        this.props.name = name;
        this.props.description = description;
        this.addDomainEvent(new RelationshipTypeUpdatedEvent_1.RelationshipTypeUpdatedEvent(this.id));
    }
    delete() {
        this.addDomainEvent(new RelationshipTypeDeletedEvent_1.RelationshipTypeDeletedEvent(this.id));
    }
    get id() {
        return this._id;
    }
    get name() {
        return this.props.name;
    }
    get description() {
        return this.props.description;
    }
    get sourceEntityTypeId() {
        return this.props.sourceEntityTypeId;
    }
    get targetEntityTypeId() {
        return this.props.targetEntityTypeId;
    }
}
exports.RelationshipType = RelationshipType;
//# sourceMappingURL=RelationshipType.js.map