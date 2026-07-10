"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipEvidence = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
/**
 * RelationshipEvidence Entity.
 * Represents evidence supporting a Relationship aggregate.
 */
class RelationshipEvidence extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    get relationshipId() { return this.props.relationshipId; }
    get sourceUri() { return this.props.sourceUri; }
    get description() { return this.props.description; }
    get createdAt() { return this.props.createdAt; }
}
exports.RelationshipEvidence = RelationshipEvidence;
//# sourceMappingURL=RelationshipEvidence.js.map