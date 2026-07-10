"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityVersion = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
class EntityVersion extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        return new EntityVersion(props, id);
    }
    get entityId() { return this.props.entityId; }
    get versionNumber() { return this.props.versionNumber; }
    get metadata() { return this.props.metadata; }
    get createdAt() { return this.props.createdAt; }
}
exports.EntityVersion = EntityVersion;
//# sourceMappingURL=EntityVersion.js.map