"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityType = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const EntityTypeCreatedEvent_1 = require("../events/EntityTypeCreatedEvent");
const EntityTypeUpdatedEvent_1 = require("../events/EntityTypeUpdatedEvent");
const EntityTypeDeletedEvent_1 = require("../events/EntityTypeDeletedEvent");
class EntityType extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const entityType = new EntityType(props, id);
        if (!id) {
            entityType.addDomainEvent(new EntityTypeCreatedEvent_1.EntityTypeCreatedEvent(entityType.id));
        }
        return entityType;
    }
    update(name, description) {
        this.props.name = name;
        this.props.description = description;
        this.addDomainEvent(new EntityTypeUpdatedEvent_1.EntityTypeUpdatedEvent(this.id));
    }
    delete() {
        this.addDomainEvent(new EntityTypeDeletedEvent_1.EntityTypeDeletedEvent(this.id));
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
}
exports.EntityType = EntityType;
//# sourceMappingURL=EntityType.js.map