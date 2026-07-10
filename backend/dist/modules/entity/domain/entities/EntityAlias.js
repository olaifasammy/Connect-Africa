"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityAlias = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
class EntityAlias extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    get entityId() { return this.props.entityId; }
    get name() { return this.props.name; }
    get createdAt() { return this.props.createdAt; }
}
exports.EntityAlias = EntityAlias;
//# sourceMappingURL=EntityAlias.js.map