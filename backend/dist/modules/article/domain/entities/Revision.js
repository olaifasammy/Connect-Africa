"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Revision = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
class Revision extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        return new Revision(props, id);
    }
    get contentSnapshot() {
        return this.props.contentSnapshot;
    }
}
exports.Revision = Revision;
//# sourceMappingURL=Revision.js.map