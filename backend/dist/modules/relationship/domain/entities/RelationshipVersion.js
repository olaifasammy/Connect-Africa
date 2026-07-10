"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipVersion = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
/**
 * RelationshipVersion Entity.
 * Represents a historical snapshot of a Relationship aggregate.
 */
class RelationshipVersion extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    get relationshipId() { return this.props.relationshipId; }
    get versionNumber() { return this.props.versionNumber; }
    get data() { return this.props.data; }
    get createdAt() { return this.props.createdAt; }
}
exports.RelationshipVersion = RelationshipVersion;
//# sourceMappingURL=RelationshipVersion.js.map