"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityIdentifier = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
class EntityIdentifier extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    get entityId() { return this.props.entityId; }
    get identifier() { return this.props.identifier; }
    get createdAt() { return this.props.createdAt; }
}
exports.EntityIdentifier = EntityIdentifier;
//# sourceMappingURL=EntityIdentifier.js.map